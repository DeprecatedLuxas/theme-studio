import { useUser } from "@auth0/nextjs-auth0";
import { FaPalette, FaKeyboard, FaCode } from "react-icons/fa";
import Loading from "@components/Loading";
import { useRouter } from "next/router";
import VSCode from "@components/VSCode";
import { Tab } from "@headlessui/react";
import { useReducer } from "react";
import EditorHelper from "@helpers/editor";
import registry from "@lib/registry";
import { reducer, RegistryContext } from "@contexts/RegistryContext";
import { isMobile } from "react-device-detect";
import MobileWarning from "@components/Editor/MobileWarning";
import Divider from "@components/Divider";
import { Button } from "@components/Forms";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@components/Dialog";
import _ from "lodash";
import { useBiscuitBox } from "@hooks/use-biscuit-box";
import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";
import useStorage from "@hooks/useStorage";
import PaletteTab from "@components/Editor/PaletteTab";
import SyntaxTab from "@components/Editor/SyntaxTab";
import EditorTab from "@components/Editor/EditorTab";
import { VscGear } from "react-icons/vsc";
import { encode } from "@helpers/encoding";

export default function Local() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const {
    isOpen: isTryItOutOpen,
    onClose: onTryItOutClose,
    onOpen: onTryItOutOpen,
  } = useBiscuitBox();
  const {
    isOpen: isExportOpen,
    onClose: onExportClose,
    onOpen: onExportOpen,
  } = useBiscuitBox();

  const { storage, setStorage, clear } = useStorage(
    "theme",
    EditorHelper.getFakeStorage()
  );
  const [setupConfig, ,] = useRecoilState(setupState);

  // TODO: Make this code clone from local storage
  const [state, dispatch] = useReducer(reducer, {
    variables:
      registry.cloneAll(storage) || registry.compileAll(setupConfig.type),
    categories: registry.getCategories(),
    palette:
      registry.clone(storage, "palette") ||
      registry.compile(setupConfig.type, "palette"),
    editor:
      registry.clone(storage, "editor") ||
      registry.compile(setupConfig.type, "editor"),
    syntax:
      registry.clone(storage, "syntax") ||
      registry.compile(setupConfig.type, "syntax"),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isMobile) {
    return <MobileWarning />;
  }

  // If user is authenticated, redirect to homepage.
  if (user) router.push("/");

  // TODO: Fix this, it renders the page before this pushes.
  // If the user doesn't have something in the storage, redirect to the setup page
  if (EditorHelper.compare(storage, EditorHelper.getFakeStorage())) {
    router.push("/edit/setup");
  }

  const handleSave = () => {
    // Save to storage, only the variables that changed
    // TODO: Add a toast in the right corner to indicate status about the save.
    // Combine all variables, check what changed from the either the previous save or the registry defaults
    //     _.reduce(a, function(result, value, key) {
    //     return _.isEqual(value, b[key]) ?
    //         result : result.concat(key);
    // }, []);
  };

  const handleDownload = () => {
    onExportClose();
    let link = document.createElement("a");
    link.download = "theme.json";
    let blob = new Blob(
      [JSON.stringify(EditorHelper.toVSCFormat(registry.variables), null, 2)],
      {
        type: "application/json",
      }
    );
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleTryItOut = () => {
    onTryItOutClose();
    const { name, variables, type } = storage;
    const encoded = encode(JSON.stringify({ name, variables, type }));
    router.push(
      `vscode://lucasnorgaard.vscode-theme-studio-visualizer?theme=${encoded}`
    );
  };

  const handleSettings = () => {
    // Save to storage, before redirecting to the settings page
    handleSave();
    router.push("/edit/local/settings");
  };

  return (
    <RegistryContext.Provider value={{ ...state, dispatch }}>
      <div className="flex h-screen">
        <div className="w-72 flex flex-col p-2 bg-gray-900">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl text-white font-roboto">Theme Studio</h1>
            <button
              className="p-1 rounded hover:bg-gray-600 text-gray-600 hover:text-gray-400"
              onClick={handleSettings}
            >
              <VscGear className="text-2xl" />
            </button>
          </div>
          <Divider color="bg-gray-700" />

          <Tab.Group>
            <Tab.List className="flex justify-between px-16 py-4">
              <Tab
                className="p-2 rounded-lg cursor-pointer bg-gray-800"
                aria-label="Palette Tab"
              >
                <FaPalette size="20px" color="white" />
              </Tab>

              <Tab
                className="p-2 rounded-lg cursor-pointer bg-gray-800"
                aria-label="Editor Tab"
              >
                <FaKeyboard size="20px" color="white" />
              </Tab>
              <Tab
                className="p-2 rounded-lg cursor-pointer bg-gray-800"
                aria-label="Syntax Tab"
              >
                <FaCode size="20px" color="white" />
              </Tab>
            </Tab.List>
            <Tab.Panels className="flex-1 overflow-y-auto">
              <Tab.Panel>
                <PaletteTab />
              </Tab.Panel>
              <Tab.Panel>
                <EditorTab />
              </Tab.Panel>
              <Tab.Panel>
                <SyntaxTab />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <Divider color="bg-gray-700" />
          <Button onClick={onTryItOutOpen} className="mb-4 mx-2">
            Try it out
          </Button>
          <div className="w-full h-auto flex justify-center">
            <Button onClick={handleSave} className="w-full mx-2">
              Save
            </Button>
            <Button onClick={onExportOpen} className="mx-2 w-full">
              Export
            </Button>
          </div>
        </div>
        <div className="flex-1 p-8 bg-gray-700">
          <VSCode storage={storage} />
        </div>
      </div>
      <Dialog isOpen={isTryItOutOpen} onClose={onTryItOutClose}>
        <DialogHeader>Try It Out - Beta</DialogHeader>
        <DialogBody>
          <p className="text-white mb-2">
            Before you can try it out live, you need the Theme Studio Visualizer
            Extension
          </p>

          <p className="text-white mb-2">
            You can download the extension{" "}
            <a
              href="vscode:extension/lucasnorgaard.vscode-theme-studio-visualizer"
              className="text-blue-400 underline"
            >
              here
            </a>
          </p>
        </DialogBody>

        <DialogFooter>
          <Button onClick={onTryItOutClose} className="mr-4">
            Close
          </Button>
          <Button onClick={handleTryItOut}>Try it out</Button>
        </DialogFooter>
      </Dialog>

      <Dialog isOpen={isExportOpen} onClose={onExportClose}>
        <DialogHeader>Export Theme</DialogHeader>
        <DialogBody>
          <p className="text-white mb-2">
            Before you can export your theme, you need to fill some more
            options.
          </p>
        </DialogBody>

        <DialogFooter>
          <Button onClick={onExportClose} className="mr-4">
            Close
          </Button>
          <Button onClick={handleDownload}>Export</Button>
        </DialogFooter>
      </Dialog>
    </RegistryContext.Provider>
  );
}
