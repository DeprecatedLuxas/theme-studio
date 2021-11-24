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
      conditionalClassName={{
        "brc@activityBar.border": {
          when: "NOT_NULL",
          then: "border-r-2",
        },
      }}
      bind={[
        "bg@activityBar.background",
        "c@activityBar.foreground",
        "brc@activityBar.border",
      ]}
    >
      <Element>
        <Element
          className="flex justify-center items-center border-l-2 w-activityicon h-activityicon cursor-pointer relative"
          bind={["blc@activityBar.activeBorder"]}
        >
          <VscFiles fontSize="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
        >
          <VscSearch fontSize="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
        >
          <VscSourceControl fontSize="24px" />
          <Element
            className="absolute rounded-full w-4 h-4 text-badge text-center right-badge bottom-badge"
            bind={[
              "bg@activityBarBadge.background",
              "c@activityBarBadge.foreground",
            ]}
          >
            6
          </Element>
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
        >
          <VscDebugAlt fontSize="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
        >
          <VscExtensions fontSize="24px" />
        </Element>
      </Element>
      <Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
        >
          <VscAccount fontSize="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
        >
          <VscGear fontSize="24px" />
        </Element>
      </Element>
    </Element>
  );
}
