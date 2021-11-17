import Element from "./Element";
import TitleBar from "./TitleBar";
import StatusBar from "./StatusBar";
import ActivityBar from "./ActivityBar";
import SideBar from "./SideBar";

export default function VSCode() {
  return (
    <Element className="h-full">
      <TitleBar />
      <Element className="flex h-content">
        <ActivityBar />
        <SideBar />
        <Element className="flex-1">

        </Element>
      </Element>
      <StatusBar />
    </Element>
  );
}
