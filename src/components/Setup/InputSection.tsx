import Input from "@components/Input";
import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";

export default function InputSection() {
  const [config, setConfig] = useRecoilState(setupState);

  return (
    <section className="mb-8 h-16">
      <Input
        placeholder="Theme Name"
        w
        clearable
        defaultValue={config.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setConfig({
            ...config,
            name:
              (e.target.value.trim().length > 0
                ? e.target.value.trim()
                : "Untitled") || "Untitled",
          });
        }}
      >
        Theme Name
      </Input>
    </section>
  );
}
