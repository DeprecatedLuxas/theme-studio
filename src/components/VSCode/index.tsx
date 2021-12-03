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

export interface VSCodeProps {
  sidebarPlacement?: "left" | "right";
}

export default function VSCode({ sidebarPlacement = "left" }: VSCodeProps) {
  const [options, setOptions] = useRecoilState(vscodeState);

  useEffect(() => {
    setOptions({
      sidebarPlacement,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Element className="h-full">
      <TitleBar />
      <Element className="flex h-content">
        {sidebarPlacement === "left" && (
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
        {sidebarPlacement === "right" && (
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
