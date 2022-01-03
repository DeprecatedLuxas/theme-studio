import { Input } from "@components/Forms";
import { ChangeEvent, useCallback } from "react";
import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";
import Select, {SingleValue } from "react-select";
import { ThemeType } from "@lib/types";

export default function GeneralTab() {
  const [config, setConfig] = useRecoilState(setupState);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setConfig({
        ...config,
        name:
          (e.target.value.trim().length > 0
            ? e.target.value.trim()
            : "Untitled") || "Untitled",
      });
    },
    [config, setConfig]
  );

  const handleTypeChange = useCallback(
    (
      option: SingleValue<{
        value: ThemeType;
        label: string;
      }>
    ) => {
      setConfig({
        ...config,
        type: option?.value || "dark",
      });
    },
    [config, setConfig]
  );

  return (
    <div>
      <h1 className="font-roboto mb-4 text-3xl">General</h1>
      <section className="mb-6 h-16">
        <h2>Theme Name</h2>
        <Input
          placeholder="Theme Name"
          border="border-gray-400"
          defaultValue={config.name}
          onChange={handleChange}
        />
      </section>
      <section>
        <h2>Theme Type</h2>
        <section className="w-48">
          <Select
            options={[
              { value: "dark", label: "Dark" },
              { value: "light", label: "Light" },
              { value: "hc", label: "High Contrast" },
            ]}
            defaultValue={{
              value: config.type,
              label:
                config.type === "hc"
                  ? "High Contrast"
                  : config.type.charAt(0).toUpperCase() + config.type.slice(1),
            }}
            onChange={handleTypeChange}
          />
        </section>
      </section>
    </div>
  );
}
