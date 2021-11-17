import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscAccount,
  VscGear,
} from "react-icons/vsc";
import Element from "./Element";

export default function ActivityBar() {
  return (
    <Element
      className="flex w-activitybar flex-col justify-between"
      // v={["bg@activityBar.background", "text@activityBar.foreground"]}
    >
      <Element>
        <Element
          className="flex justify-center items-center border-l-2 text-white w-activityicon h-activityicon cursor-pointer relative"
          // v={["borderL@activityBar.border"]}
        >
          <VscFiles fontSize="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          // v="text@activityBar.inactiveForeground"
        >
          <VscSearch fontSize="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          // v="text@activityBar.inactiveForeground"
        >
          <VscSourceControl fontSize="24px" />
          <Element
            className="absolute rounded-full w-4 h-4 text-badge text-white text-center right-badge bottom-badge"
            // v={[
            //   "bg@activityBarBadge.background",
            //   "text@activityBarBadge.foreground",
            // ]}
          >
            6
          </Element>
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          // v="text@activityBar.inactiveForeground"
        >
          <VscDebugAlt fontSize="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          // v="text@activityBar.inactiveForeground"
        >
          <VscExtensions fontSize="24px" />
        </Element>
      </Element>
      <Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          // v="text@activityBar.inactiveForeground"
        >
          <VscAccount fontSize="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          // v="text@activityBar.inactiveForeground"
        >
          <VscGear fontSize="24px" />
        </Element>
      </Element>
    </Element>
  );
}
