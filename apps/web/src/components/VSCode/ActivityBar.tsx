import Icon from "@components/Icon";
import Element from "./Element";

export default function ActivityBar() {
  return (
    <Element
      className="flex w-12.5 flex-col justify-between"
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
      <div>
        <Element
          className="flex justify-center items-center border-l-2 w-12.5 h-12.5 cursor-pointer relative"
          bind={["blc@activityBar.activeBorder"]}
        >
          <Icon icon="VscFiles" size="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-12.5 h-12.5 cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
          onHover={["c@activityBar.foreground"]}
        >
          <Icon icon="VscSearch" size="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-12.5 h-12.5 cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
          onHover={["c@activityBar.foreground"]}
        >
          <Icon icon="VscSourceControl" size="24px" />
          <Element
            className="absolute w-4 h-4 text-center rounded-full select-none text-badge right-badge bottom-badge"
            bind={[
              "bg@activityBarBadge.background",
              "c@activityBarBadge.foreground",
            ]}
            onHover={["c@activityBar.foreground"]}
          >
            6
          </Element>
        </Element>
        <Element
          className="flex justify-center items-center w-12.5 h-12.5 cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
          onHover={["c@activityBar.foreground"]}
        >
          <Icon icon="VscDebugAlt" size="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-12.5 h-12.5 cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
          onHover={["c@activityBar.foreground"]}
        >
          <Icon icon="VscExtensions" size="24px" />
        </Element>
      </div>
      <div>
        <Element
          className="flex justify-center items-center w-12.5 h-12.5 cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
          onHover={["c@activityBar.foreground"]}
        >
          <Icon icon="VscAccount" size="24px" />
        </Element>
        <Element
          className="flex justify-center items-center w-12.5 h-12.5 cursor-pointer relative"
          bind={["c@activityBar.inactiveForeground"]}
          onHover={["c@activityBar.foreground"]}
        >
          <Icon icon="VscGear" size="24px" />
        </Element>
      </div>
    </Element>
  );
}
