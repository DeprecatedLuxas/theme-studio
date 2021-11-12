import { useUser } from "@auth0/nextjs-auth0";
import { FaPalette, FaKeyboard, FaCode } from "react-icons/fa";
import Loading from "@components/Editor/Loading";
import { useRouter } from "next/router";
import windy from "@helpers/windy";
import Settings from "@components/Editor/Settings";
import { BsStars, BsCloudDownload } from "react-icons/bs";
import VSCode from "@components/VSCode";
import { Tab } from "@headlessui/react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useEffect, useReducer } from "react";
import EditorHelper from "@helpers/editor";
import Accordion from "@components/Accordion";
import registry from "@lib/registry";
import { reducer, RegistryContext } from "@contexts/RegistryContext";
import { VariableTab } from "@lib/types";
import Variable from "@components/Editor/Variable";

const Spacer = windy.div`
  h-1
  my-2
  rounded-lg
  border-gray-700
  border-b-2
`;

export default function EditLocal() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  const [storage, setStorage] = useLocalStorage("theme", "");

  const [state, dispatch] = useReducer(reducer, {
    variables: registry.compile("dark"),
  });
  useEffect(() => {
    setStorage(
      JSON.parse(
        JSON.stringify({
          name: "Test",
          type: "dark",
          palette: [],
          variables: {}
        })
      )
    );
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (user) router.push("/");

  if (EditorHelper.isValidStorage(storage)) {
  }

  const handleSave = () => {};

  const handleDownload = () => {
    let link = document.createElement("a");
    link.download = "theme.json";
    let blob = new Blob([JSON.stringify({ hello: "what" })], {
      type: "application/json",
    });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <RegistryContext.Provider value={{ ...state, dispatch }}>
      <div className="flex h-screen">
        <div className="w-72 flex flex-col p-2 bg-gray-900">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl text-white font-roboto">Theme Studio</h1>
            <Settings />
          </div>
          <Spacer />
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
              ))}
            </Tab.Panels>
          </Tab.Group>

          <Spacer />
          <div className="w-full h-auto flex ">
            <button
              className="w-32 mx-auto bg-blue-700 hover:bg-blue-800 text-white font-roboto my-2 py-2 rounded-xl"
              onClick={handleSave}
            >
              <BsStars className="inline-block" /> Save
            </button>
            <button
              className="w-32 mx-auto bg-blue-700 hover:bg-blue-800 text-white font-roboto my-2 py-2 rounded-xl"
              onClick={handleDownload}
            >
              <BsCloudDownload className="inline-block" /> Export
            </button>
          </div>
        </div>
        <div className="flex-1 p-8 bg-gray-700">
          <VSCode functional={false} />
        </div>
      </div>
    </RegistryContext.Provider>
  );
}
