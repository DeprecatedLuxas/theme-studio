import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { decode } from "@helpers/encoding";
import Divider from "@components/Divider";
import Button from "@components/Button";
import { VscGear } from "react-icons/vsc";
import VSCode from "@components/VSCode";
import { reducer, RegistryContext } from "@contexts/RegistryContext";
import registry from "@lib/registry";
import { useReducer, useState } from "react";
import { SetupConfig } from "@lib/types";

export default function Preview({
  preview,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [options, setOptions] = useState<SetupConfig>(JSON.parse(preview));

  const [state, dispatch] = useReducer(reducer, {
    variables: registry.compileAll(options.type),
  });

  return (
    <RegistryContext.Provider value={{ ...state, dispatch }}>
      <div className="flex h-screen">
        <div className="w-72 flex flex-col p-2 bg-gray-900">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl text-white font-roboto">Theme Studio</h1>
            <button className="p-1 rounded hover:bg-gray-600 text-gray-600 hover:text-gray-400 cursor-not-allowed">
              <VscGear className="text-2xl" />
            </button>
          </div>
          <Divider color="bg-gray-700" />
          <div className="flex-1">
            <p className="text-white text-xl mt-12">
              This is a preview of your options, therefor there is nothing here.
            </p>
          </div>

          <Divider color="bg-gray-700" />
          <Button className="mb-4 mx-2 bg-red-700" disabled>
            Try it out
          </Button>
          <div className="w-full h-auto flex justify-center">
            <Button className="w-full mx-2 bg-red-700" disabled>
              Save
            </Button>
            <Button className="mx-2 w-full bg-red-700" disabled>
              Export
            </Button>
          </div>
        </div>
        <div className="flex-1 p-8 bg-gray-700">
          <VSCode sidebarPlacement={options.options.sidebar} />
        </div>
      </div>
    </RegistryContext.Provider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (typeof context.query.preview === "undefined") {
    return {
      redirect: {
        destination: "/edit/setup",
        permanent: false,
      },
    };
  }

  let previewQuery: string = (
    Array.isArray(context.query.preview)
      ? context.query.preview[0]
      : context.query.preview
  )!;
  return {
    props: {
      preview: decode(previewQuery),
    },
  };
}
