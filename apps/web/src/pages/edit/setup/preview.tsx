import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { decode } from "@theme-studio/core";

import Divider from "@components/Divider";
import { Button } from "@components/Forms";
import VSCode from "@components/VSCode";
import { reducer, RegistryContext } from "@contexts/RegistryContext";
import registry from "@lib/registry";
import { useReducer, useState } from "react";
import { SetupConfig } from "@lib/types";
import { getAgent, UserAgentParser } from "@lib/detection";
import Icon from "@components/Icon";

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
              <Icon icon="VscGear" className="text-2xl" />
            </button>
          </div>
          <Divider color="bg-gray-700" />
          <div className="flex-1">
            <p className="text-white text-xl mt-12">
              This is a preview of your options, therefor there is nothing here.
            </p>
          </div>

          <Divider color="bg-gray-700" />
          <Button className="mb-4 mx-2" disabled>
            Try it out
          </Button>
          <div className="w-full h-auto flex justify-center">
            <Button className="w-full mx-2" disabled>
              Save
            </Button>
            <Button className="mx-2 w-full" disabled>
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const userAgent = UserAgentParser.parse(getAgent(ctx.req));
  const isMobileAgent = userAgent.device === "mobile";

  if (userAgent.agent === "" || isMobileAgent) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (typeof ctx.query.preview === "undefined") {
    return {
      redirect: {
        destination: "/edit/setup",
        permanent: false,
      },
    };
  }

  let previewQuery: string = (
    Array.isArray(ctx.query.preview) ? ctx.query.preview[0] : ctx.query.preview
  )!;
  return {
    props: {
      preview: decode(previewQuery),
    },
  };
}
