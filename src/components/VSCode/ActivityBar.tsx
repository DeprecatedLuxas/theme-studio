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
          events={["onHover:c@activityBar.foreground"]}
        >
          <VscSearch fontSize="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
          events={["onHover:c@activityBar.foreground"]}
        >
          <VscSourceControl fontSize="24px" />
          <Element
            className="absolute rounded-full w-4 h-4 text-badge text-center right-badge bottom-badge select-none"
            bind={[
              "bg@activityBarBadge.background",
              "c@activityBarBadge.foreground",
            ]}
            events={["onHover:c@activityBar.foreground"]}
          >
            6
          </Element>
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
          events={["onHover:c@activityBar.foreground"]}
        >
          <VscDebugAlt fontSize="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
          events={["onHover:c@activityBar.foreground"]}
        >
          <VscExtensions fontSize="24px" />
        </Element>
      </Element>
      <Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
          events={["onHover:c@activityBar.foreground"]}
        >
          <VscAccount fontSize="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-activityicon h-activityicon cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
          events={["onHover:c@activityBar.foreground"]}
        >
          <VscGear fontSize="24px" />
        </Element>
      </Element>
    </Element>
  );
}
