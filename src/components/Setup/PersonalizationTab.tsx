import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";
import Select, { ActionMeta, SingleValue } from "react-select";
import { useCallback } from "react";
import { IconPack, SideBarPlacement } from "@lib/types";

const iconPacks: {
  name: string;
  value: IconPack;
}[] = [
  {
    name: "Seti Icons",
    value: "seti-icons",
  },
  {
    name: "Material Icons",
    value: "material-icons",
  },
  {
    name: "VSCode Icons",
    value: "vscode-icons",
  },
];

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
          iconPack: option?.value || "seti-icons",
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
        <section className="w-48">
          <Select
            options={[
              { value: "seti-icons", label: "Seti Icons" },
              { value: "vscode-icons", label: "VSCode Icons" },
              { value: "material-icons", label: "Material Icons" },
            ]}
            defaultValue={{
              value: config.options.iconPack,
              label:
                config.options.iconPack.charAt(0).toUpperCase() +
                config.options.iconPack.slice(1),
            }}
            onChange={handleIconPackChange}
          />
        </section>
      </section>
    </div>
  );
}
