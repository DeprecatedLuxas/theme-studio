import IconPack from "@components/IconPack";
import { Nullable } from "@lib/types";
import { vscodeState } from "@recoil/atoms/vscode";
import { useState } from "react";
import {
  VscEllipsis,
  VscGitCompare,
  VscSplitHorizontal,
  VscClose,
} from "react-icons/vsc";
import { useRecoilState } from "recoil";
import Element from "./Element";

export default function Tabs() {
  const [options, setOptions] = useRecoilState(vscodeState);

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
            "h:bg@tab.hoverBackground",
            "c@tab.activeForeground",
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
            <IconPack from={options.iconPack} type="tsx" />
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
                <VscClose fontSize={"16"} />
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
            "brc@tab.border",
            "c@tab.inactiveForeground",
          ]}
          onMouseEnter={() => {
            setHover("header");
          }}
          onMouseLeave={() => {
            setHover(null);
          }}
        >
          <div className="flex-1 flex items-center justify-start leading-[35px]">
            <IconPack from={options.iconPack} type="tsx" />
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
                  <VscClose fontSize={"16"} />
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
            "brc@tab.border",
            "c@tab.inactiveForeground",
          ]}
          onMouseEnter={() => {
            setHover("id");
          }}
          onMouseLeave={() => {
            setHover(null);
          }}
        >
          <div className="flex-1 flex items-center justify-start leading-[35px]">
            <IconPack from={options.iconPack} type="ts" />
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
                  <VscClose fontSize={"16"} />
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
          <VscGitCompare />
        </Element>
        <Element
          className="h-5.5 w-5.5 flex items-center justify-center rounded-md mr-1"
          bind={["h:bg@toolbar.hoverBackground", "c@iconForeground"]}
        >
          <VscSplitHorizontal />
        </Element>

        <Element
          className="h-5.5 w-5.5 flex items-center justify-center rounded-md mr-1"
          bind={["h:bg@toolbar.hoverBackground", "c@iconForeground"]}
        >
          <VscEllipsis />
        </Element>
      </Element>
    </Element>
  );
}
