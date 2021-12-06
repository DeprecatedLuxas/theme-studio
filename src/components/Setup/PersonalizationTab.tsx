import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";
import Select, { ActionMeta, SingleValue } from "react-select";
import { useCallback } from "react";
import { SideBarPlacement } from "@lib/types";

export default function PersonalizationTab() {
  const [config, setConfig] = useRecoilState(setupState);

  const handleSidebarChange = useCallback(
    (
      option: SingleValue<{
        value: SideBarPlacement;
        label: string;
      }>,
      actionMeta: ActionMeta<{
        value: SideBarPlacement;
        label: string;
      }>
    ) => {
      console.log(option, actionMeta);
      setConfig({
        ...config,
        options: {
          ...config.options,
          sidebar: option?.value || "left",
        },
      });
    },
    [config, setConfig]
  );

  return (
    <div className="flex flex-col">
      <h1 className="font-roboto mb-4 text-3xl font-semibold">
        Personalization
      </h1>
      <section>
        <h4>Sidebar Placement</h4>
        {/* <div className="flex rounded bg-gray-200 p-2 w-max">
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
        </div> */}
        <section className="w-48">
          <Select
            options={[
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
            ]}
            defaultValue={{
              value: config.options.sidebar,
              label:
                config.options.sidebar.charAt(0).toUpperCase() +
                config.options.sidebar.slice(1),
            }}
            onChange={handleSidebarChange}
          />
        </section>
      </section>
      <section className="mt-4">
        <h4>Icon Pack</h4>
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
