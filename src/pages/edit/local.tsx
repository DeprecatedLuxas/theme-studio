import { useUser } from "@auth0/nextjs-auth0";
import { FaPalette, FaKeyboard, FaCode } from "react-icons/fa";
import Loading from "@components/Loading";
import { useRouter } from "next/router";
import { BsStars, BsCloudDownload } from "react-icons/bs";
import VSCode from "@components/VSCode";
import { Tab } from "@headlessui/react";
import { useEffect, useReducer } from "react";
import EditorHelper from "@helpers/editor";
import registry from "@lib/registry";
import { reducer, RegistryContext } from "@contexts/RegistryContext";
import { isMobile } from "react-device-detect";
import EditWarning from "@components/Editor/EditorWarning";
import Divider from "@components/Divider";
import Button from "@components/Button";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@components/Dialog";

import { useBiscuitBox } from "@hooks/use-biscuit-box";
import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";
import useStorage from "@hooks/useStorage";
import PaletteTab from "@components/Editor/PaletteTab";
import SyntaxTab from "@components/Editor/SyntaxTab";
import EditorTab from "@components/Editor/EditorTab";

export default function EditLocal() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useBiscuitBox();
  const { storage, setStorage, clear } = useStorage(
    "theme",
    EditorHelper.getFakeStorage()
  );
  const [setupConfig, _] = useRecoilState(setupState);

  const [state, dispatch] = useReducer(reducer, {
    // variables: registry.compile(setupConfig.type),
    palette: registry.compile(setupConfig.type, "palette"),
    editor: registry.compile(setupConfig.type, "editor"),
    syntax: registry.compile(setupConfig.type, "syntax"),
  });

  useEffect(() => {
    console.log(storage);
  }, []);
  // useEffect(() => {
  //   setStorage(
  //     JSON.parse(
  //       JSON.stringify({
  //         name: "Test",
  //         type: "dark",
  //         palette: [],
  //         variables: {},
  //       })
  //     )
  //   );
  // }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isMobile) {
    return <EditWarning />;
  }

  // If user is authenticated, redirect to homepage.
  if (user) router.push("/");

  // If the user doesn't have something in the storage, redirect to the setup page
  if (EditorHelper.compare(storage, EditorHelper.getFakeStorage()))
    router.push("/edit/setup");

  if (EditorHelper.isValidStorage(storage)) {
    console.log(storage);

    // TODO: Set storage to the registry.
  }

  const handleSave = () => {
    // Save to storage, only the variables that changed
  };

  const handleDownload = () => {
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
    // router.push(
    //   "vscode://lucasnorgaard.vscode-theme-studio-visualizer?{base64encodedtheme}"
    // );
  };

  return (
    <RegistryContext.Provider value={{ ...state, dispatch }}>
      <div className="flex h-screen">
        <div className="w-72 flex flex-col p-2 bg-gray-900">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl text-white font-roboto">Theme Studio</h1>
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
              {/* TODO: Clean up this part, to not re render every time when a variables changes.
              {Object.keys(state.variables!).map((key: string) => (
                <Tab.Panel key={uuid()}>
                  {Object.keys(state.variables![key as VariableTab]).map(
                    (k: string) => (
                      <Accordion text={k} key={uuid()}>
                        {Object.keys(
                          state.variables![key as VariableTab][k]
                        ).map((kk: string) => (
                          <Variable
                            key={uuid()}
                            name={kk}
                            value={state.variables![key as VariableTab][k][kk]}
                          />
                        ))}
                      </Accordion>
                    )
                  )}
                </Tab.Panel>
              ))} */}
            </Tab.Panels>
          </Tab.Group>
          <Divider color="bg-gray-700" />
          <Button onClick={onOpen} className="mb-4 mx-2">
            Try it out
          </Button>
          <div className="w-full h-auto flex justify-center">
            <Button onClick={handleSave} className="w-full mx-2">
              <BsStars className="inline-block" />
              Save
            </Button>
            <Button onClick={handleDownload} className="mx-2 w-full">
              <BsCloudDownload className="inline-block" /> Export
            </Button>
          </div>
        </div>
        <div className="flex-1 p-8 bg-gray-700">
          <VSCode />
        </div>
      </div>
      <Dialog isOpen={isOpen} onClose={onClose}>
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
          <Button onClick={handleTryItOut} className="mr-4">
            Try it out
          </Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </Dialog>
    </RegistryContext.Provider>
  );
}
