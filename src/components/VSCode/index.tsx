import Element from "./Element";
import TitleBar from "./TitleBar";
import StatusBar from "./StatusBar";
import ActivityBar from "./ActivityBar";
import SideBar from "./SideBar";
import Tabs from "./Tabs";
import Breadcrumbs from "./Breadcrumbs";
import Content from "./Content";
import { useRecoilState } from "recoil";
import { vscodeState } from "@recoil/atoms/vscode";
import { useEffect } from "react";
import { IconPack, ThemeStorage } from "@lib/types";
import EditorHelper from "@helpers/editor";

export interface VSCodeProps {
  storage?: ThemeStorage;
  sidebarPlacement?: "left" | "right";
  iconPack?: IconPack;
}

export default function VSCode({
  storage = EditorHelper.getFakeStorage(),
  sidebarPlacement,
  iconPack,
}: VSCodeProps) {
  const { options: storageOptions } = storage;
  const [options, setOptions] = useRecoilState(vscodeState);

  useEffect(() => {
    setOptions({
      sidebarPlacement: sidebarPlacement || storage.options?.sidebar || "left",
      iconPack: iconPack || storage.options?.iconPack || "Seti Icons",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Element className="h-full">
      <TitleBar />
      <Element className="flex h-content">
        {(sidebarPlacement === "left" ||
          storageOptions?.sidebar === "left") && (
          <>
            <ActivityBar />
            <SideBar />
          </>
        )}
        <Element className="flex-1 flex flex-col">
          <Tabs />
          <Breadcrumbs />
          <Element className="flex-1">
            <Content />
          </Element>
        </Element>
        {(sidebarPlacement === "right" ||
          storageOptions?.sidebar === "right") && (
          <>
            <SideBar />
            <ActivityBar />
          </>
        )}
      </Element>
      <StatusBar />
    </Element>
  );
}
