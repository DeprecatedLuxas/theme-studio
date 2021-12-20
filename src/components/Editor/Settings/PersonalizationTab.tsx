import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";
import Select, { ActionMeta, SingleValue } from "react-select";
import { useCallback } from "react";
import { IconPack, SideBarPlacement } from "@lib/types";
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

  const handleIconPackChange = useCallback(
    (
      option: SingleValue<{
        value: IconPack;
        label: string;
      }>,
      actionMeta: ActionMeta<{
        value: IconPack;
        label: string;
      }>
    ) => {
      setConfig({
        ...config,
        options: {
          ...config.options,
          iconPack: option?.value || "Material Icons",
        },
      });
    },
    [config, setConfig]
  );

  return (
    <div className="flex flex-col">
      <section>
        <h2>Sidebar Placement</h2>
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
        <h2>Icon Pack</h2>
        <section className="w-48">
          <Select
            options={[
              { value: "VSCode Icons", label: "VSCode Icons" },
              { value: "Material Icons", label: "Material Icons" },
            ]}
            defaultValue={{
              value: config.options.iconPack,
              label: config.options.iconPack,
            }}
            onChange={handleIconPackChange}
          />
        </section>
      </section>
    </div>
  );
}
