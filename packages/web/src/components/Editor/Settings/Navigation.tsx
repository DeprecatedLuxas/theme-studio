import windy from "@helpers/windy";

const SettingsButton = windy.button`
  text-left
  font-roboto
  hover:bg-blue-700
  hover:text-white
  my-1
  mx-3
  px-2
  py-1
  rounded
`;

export interface NavigationProps {
  currentTab: number;
  onClick: (newTab: number) => void;
}

export default function Navigation({ currentTab, onClick }: NavigationProps) {
  return (
    <div className="h-12 bg-white rounded w-full p-1 flex border-blue-700 border mb-2">
      <SettingsButton
        onClick={() => onClick(1)}
        className={`${currentTab === 1 && "bg-blue-700 text-white"} ml-0`}
      >
        General
      </SettingsButton>
      <SettingsButton
        onClick={() => onClick(2)}
        className={`${currentTab === 2 && "bg-blue-700 text-white"}`}
      >
        Personalization
      </SettingsButton>

      <div className="flex-1 flex justify-end flex-col"></div>
    </div>
  );
}
