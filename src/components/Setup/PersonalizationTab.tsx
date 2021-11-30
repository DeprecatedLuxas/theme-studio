import { BsSun, BsMoon } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";

import windy from "@helpers/windy";

const BannerNotice = windy.div`
  border
  border-red-600
  bg-red-300
  text-red-800
  rounded
  p-4
  text-center
  mb-4
`;

export default function PersonalizationTab() {
  const [config, setConfig] = useRecoilState(setupState);

  return (
    <div className="flex flex-col">
      <h1 className="font-roboto mb-4 text-3xl font-semibold">
        Personalization
      </h1>
      <section>
        <h4>Sidebar Placement</h4>
        <div className="flex rounded bg-gray-200 p-2 w-max">
          <section className="px-2">
            <div
              className={`w-32 h-16 rounded border-2 flex flex-col items-center justify-center ${
                config.options.sidebar === "left" ? "border-blue-400" : ""
              }`}
              onClick={() => {
                setConfig({
                  ...config,
                  options: {
                    ...config.options,
                    sidebar: "left",
                  },
                });
              }}
            />
            <h6 className="text-center font-roboto pt-1">Left</h6>
          </section>
          <section className="px-2">
            <div
              className={`w-32 h-16 rounded border-2 flex flex-col items-center justify-center ${
                config.options.sidebar === "right" ? "border-blue-400" : ""
              }`}
              onClick={() => {
                setConfig({
                  ...config,
                  options: {
                    ...config.options,
                    sidebar: "right",
                  },
                });
              }}
            />
            <h6 className="text-center font-roboto pt-1">Right</h6>
          </section>
        </div>
      </section>
    </div>
  );
}
