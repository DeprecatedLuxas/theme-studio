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
import { ThemeStorage, TreeViewActiveItem, TreeViewItem } from "@lib/types";
import EditorHelper from "@helpers/editor";

export interface VSCodeProps {
  storage?: ThemeStorage;
  sidebarPlacement?: "left" | "right";
  branch?: string;
  files?: TreeViewItem[];
  activeFile?: TreeViewActiveItem;
  language?: string;
  name?: string;
}

export default function VSCode({
  storage = EditorHelper.getFakeStorage(),
  sidebarPlacement,
  branch,
  files,
  activeFile,
  language,
  name,
}: VSCodeProps) {
  const { options: storageOptions } = storage;
  const [options, setOptions] = useRecoilState(vscodeState);

  useEffect(() => {
    setOptions({
      sidebarPlacement: sidebarPlacement || storage.options?.sidebar || "left",
      name: name || storage.options?.repo || "vscode-theme-studio",
      branch: branch || storageOptions?.branch || "main",
      files: files || storageOptions?.files || EditorHelper.getDefaultFiles(),
      language: language || storageOptions?.language || "TypeScript React",
      activeFile:
        activeFile ||
        EditorHelper.getActiveFile(storageOptions?.files!) ||
        EditorHelper.getActiveFile(EditorHelper.getDefaultFiles()),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full">
      <TitleBar />
      <div className="flex h-content">
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
          <div className="flex-1">
            <Content />
          </div>
        </Element>
        {(sidebarPlacement === "right" ||
          storageOptions?.sidebar === "right") && (
          <>
            <SideBar />
            <ActivityBar />
          </>
        )}
      </div>
      <StatusBar />
    </div>
  );
}
