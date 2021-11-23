import Element from "./Element";
import TitleBar from "./TitleBar";
import StatusBar from "./StatusBar";
import ActivityBar from "./ActivityBar";
import SideBar from "./SideBar";
import Tabs from "./Tabs";
import Breadcrumbs from "./Breadcrumbs";
import Content from "./Content";

export default function VSCode() {
  return (
    <Element className="h-full">
      <TitleBar />
      <Element className="flex h-content">
        <ActivityBar />
        <SideBar />
        <Element className="flex-1">
          <Tabs />
          <Breadcrumbs />
          <Content />
        </Element>
      </Element>
      <StatusBar />
    </Element>
  );
}
