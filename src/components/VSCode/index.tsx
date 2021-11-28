import Element from "./Element";
import TitleBar from "./TitleBar";
import StatusBar from "./StatusBar";
import ActivityBar from "./ActivityBar";
import SideBar from "./SideBar";
import Tabs from "./Tabs";
import Breadcrumbs from "./Breadcrumbs";
import Content from "./Content";

export interface VSCodeProps {
  sidebarPlacement?: "left" | "right";
}

export default function VSCode({ sidebarPlacement = "left" }: VSCodeProps) {
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
        <Element className="flex-1">
          <Tabs />
          <Breadcrumbs />
          <Content />
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
