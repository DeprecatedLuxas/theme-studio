import IconPack from "@components/IconPack";
import { Nullable } from "@lib/types";
import { vscodeState } from "@recoil/atoms/vscode";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import Element from "./Element";
import Icon from "@components/Icon";

export default function Tabs() {
  // const options = useRecoilValue(vscodeState);

  const [hover, setHover] = useState<Nullable<"id" | "header">>(null);

  return (
    <Element
      className="w-full h-8.75 flex justify-between"
      bind={["bg@editorGroupHeader.tabsBackground", "c@foreground"]}
    >
      <Element className="flex justify-start">
        <Element
          className="w-30 min-w-fit flex cursor-pointer h-8.75 pl-2.5 text-13px select-none relative border-r-[1px]"
          bind={[
            "bg@tab.activeBackground",
            "c@tab.activeForeground",
            "h:bg@tab.hoverBackground",
            "h:c@tab.hoverForeground",
            "c@gitDecoration.modifiedResourceForeground",
            "brc@tab.border",
          ]}
        >
          <Element
            bind={["btc@tab.activeBorderTop"]}
            className="absolute h-0.25 top-0 left-0 w-full border-t-[1px]"
          />
          <div className="flex-1 flex items-center justify-start leading-[35px]">
            <IconPack type="tsx" />
            <div className="min-w-0 flex-1 pl-1.5">
              <span className="text-13px">index.tsx</span>
              <span className="ml-[5px]">M</span>
            </div>
          </div>
          <div className="w-7 my-auto">
            <div className="flex h-full w-full my-0 mx-auto items-center justify-center text-13px">
              <Element
                className="rounded p-0.5"
                bind={["h:bg@toolbar.hoverBackground", "c@iconForeground"]}
              >
                <Icon icon="VscClose" fontSize={"16"} />
              </Element>
            </div>
          </div>
          <Element
            bind={["bbc@tab.activeBorder", "h:bbc@tab.hoverBorder"]}
            className="absolute h-0.25 bottom-0 left-0 w-full border-b-[1px]"
          />
        </Element>

        <Element
          className="w-30 min-w-fit flex cursor-pointer h-8.75 pl-2.5 text-13px select-none relative border-r-[1px]"
          bind={[
            "bg@tab.inactiveBackground",
            "c@tab.inactiveForeground",
            "brc@tab.border",
            "h:bg@tab.hoverBackground",
            "h:c@tab.hoverForeground",
          ]}
          onMouseEnter={() => {
            setHover("header");
          }}
          onMouseLeave={() => {
            setHover(null);
          }}
        >
          <div className="flex-1 flex items-center justify-start leading-[35px]">
            <IconPack type="tsx" />
            <div className="min-w-0 flex-1 pl-1.5">
              <span className="text-13px">Header.tsx</span>
            </div>
          </div>
          <div className="w-7 my-auto">
            <div className="flex h-full w-full my-0 mx-auto items-center justify-center text-13px">
              {hover === "header" && (
                <Element
                  className="rounded p-0.5"
                  bind={["h:bg@toolbar.hoverBackground", "c@iconForeground"]}
                >
                  <Icon icon="VscClose" fontSize={"16"} />
                </Element>
              )}
            </div>
          </div>
          <Element
            bind={["h:bbc@tab.hoverBorder"]}
            className="absolute h-0.25 bottom-0 left-0 w-full border-b-[1px]"
          />
        </Element>
        <Element
          className="w-30 min-w-fit flex cursor-pointer h-8.75 pl-2.5 text-13px select-none relative border-r-[1px]"
          bind={[
            "bg@tab.inactiveBackground",
            "c@tab.inactiveForeground",
            "brc@tab.border",
            "h:bg@tab.hoverBackground",
            "h:c@tab.hoverForeground",
          ]}
          onMouseEnter={() => {
            console.log("heyeye");

            setHover("id");
          }}
          onMouseLeave={() => {
            setHover(null);
          }}
        >
          <div className="flex-1 flex items-center justify-start leading-[35px]">
            <IconPack type="ts" />
            <div className="min-w-0 flex-1 pl-1.5">
              <span className="text-13px">[id].ts</span>
            </div>
          </div>
          <div className="w-7 my-auto">
            <div className="flex h-full w-full my-0 mx-auto items-center justify-center text-13px">
              {hover === "id" && (
                <Element
                  className="rounded p-0.5"
                  bind={["h:bg@toolbar.hoverBackground", "c@iconForeground"]}
                >
                  <Icon icon="VscClose" fontSize={"16"} />
                </Element>
              )}
            </div>
          </div>
          <Element
            bind={["h:bbc@tab.hoverBorder"]}
            className="absolute h-0.25 bottom-0 left-0 w-full border-b-[1px]"
          />
        </Element>
      </Element>
      <Element className="flex justify-end items-center px-2 text-base">
        <Element
          className="h-5.5 w-5.5 flex items-center justify-center rounded-md mr-1"
          bind={["h:bg@toolbar.hoverBackground", "c@iconForeground"]}
        >
          <Icon icon="VscGitCompare" />
        </Element>
        <Element
          className="h-5.5 w-5.5 flex items-center justify-center rounded-md mr-1"
          bind={["h:bg@toolbar.hoverBackground", "c@iconForeground"]}
        >
          <Icon icon="VscSplitHorizontal" />
        </Element>

        <Element
          className="h-5.5 w-5.5 flex items-center justify-center rounded-md mr-1"
          bind={["h:bg@toolbar.hoverBackground", "c@iconForeground"]}
        >
          <Icon icon="VscEllipsis" />
        </Element>
      </Element>
    </Element>
  );
}
