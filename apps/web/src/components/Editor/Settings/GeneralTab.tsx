import { Input } from "@components/Forms";
import { ChangeEvent, useCallback } from "react";
import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";
import Select, { SingleValue } from "react-select";
import { ThemeType } from "@lib/types";
import { Heading } from "@theme-studio/ui";

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
      <section className="mb-4 h-16">
        <Heading type="h2">Theme Name</Heading>
        <Input
          placeholder="Theme Name"
          border="border-gray-400"
          defaultValue={config.name}
          onChange={handleChange}
        />
      </section>
      <section>
        <Heading type="h2">Theme Type</Heading>
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
