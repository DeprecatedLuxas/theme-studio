import {
  VscEllipsis,
  VscGitCompare,
  VscSplitHorizontal,
} from "react-icons/vsc";

import Element from "./Element";

export default function Tabs() {
  return (
    <Element className="w-full h-35px flex justify-between" bind={[
      "bg@tab.activeBackground"
    ]}>
      <Element className="flex">
        <Element className="flex justify-start items-center h-35px min-w-120px px-10px text-13px cursor-pointer relative">
          <span>App.tsx</span>
        </Element>
        <Element className="flex justify-start items-center h-35px min-w-120px px-10px text-13px cursor-pointer relative">
          <span>App.tsx</span>
        </Element>
        <Element className="flex justify-start items-center h-35px min-w-120px px-10px text-13px cursor-pointer relative">
          <span>App.tsx</span>
        </Element>
      </Element>
      <Element className="flex justify-end items-center px-2 text-base">
        <VscGitCompare className="inline-block" />
        <VscSplitHorizontal className="inline-block" />
        <VscEllipsis className="inline-block" />
      </Element>
    </Element>
  );
}
