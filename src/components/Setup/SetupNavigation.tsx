import { VscFeedback, VscOpenPreview } from "react-icons/vsc";
import Link from "next/link";
import windy from "@helpers/windy";
import { SetupConfig } from "@lib/types";
import { encode } from "@helpers/encoding";

const SetupButton = windy.button`
  text-left
  font-roboto
  hover:bg-blue-700
  hover:text-white
  my-1
  px-2
  py-1
  rounded
`;

export interface SetupNavigationProps {
  currentTab: number;
  onClick: (newTab: number) => void;
  config: SetupConfig;
}

export default function SetupNavigation({
  currentTab,
  onClick,
  config,
}: SetupNavigationProps) {
  return (
    <div className="w-48 bg-white rounded h-96 mr-8 p-2 flex flex-col">
      <SetupButton
        onClick={() => onClick(1)}
        className={`${currentTab === 1 && "bg-blue-700 text-white"}`}
      >
        General
      </SetupButton>
      <SetupButton
        onClick={() => onClick(2)}
        className={`${currentTab === 2 && "bg-blue-700 text-white"}`}
      >
        Personalization
      </SetupButton>

      <div className="flex-1 flex justify-end flex-col">
        <Link
          href={`/edit/setup/preview?preview=${encode(JSON.stringify(config))}`}
          passHref
        >
          <a
            target="_blank"
            className="flex items-center bg-blue-700 rounded w-full px-2 py-1 text-white font-roboto mb-2"
          >
            <VscOpenPreview className="mr-3" />
            Preview
          </a>
        </Link>
        <Link
          href="https://github.com/DeprecatedLuxas/vscode-theme-studio/issues"
          passHref
        >
          <a
            target="_blank"
            className="flex items-center bg-blue-700 rounded w-full px-2 py-1 text-white font-roboto"
          >
            <VscFeedback className="mr-3" />
            Feedback
          </a>
        </Link>
      </div>
    </div>
  );
}
