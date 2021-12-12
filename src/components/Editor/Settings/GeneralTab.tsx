import { Input } from "@components/Forms";
import { ChangeEvent, useCallback } from "react";
import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";
import { BsSun, BsMoon } from "react-icons/bs";


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
  return (
    <div>
      <section className="mb-4 h-16">
        <label>Theme Name</label>
        <Input
          placeholder="Theme Name"
          border="border-gray-400"
          defaultValue={config.name}
          onChange={handleChange}
        />
      </section>
      <section>
        <h4>Theme Type</h4>
        <div className="flex rounded bg-gray-200 p-2 w-max">
          <section className="px-2">
            <div
              className={`w-32 h-16 rounded border-2 flex flex-col items-center justify-center ${
                config.type === "dark" ? "border-blue-400" : ""
              }`}
              onClick={() => {
                setConfig({ ...config, type: "dark" });
              }}
            >
              <BsMoon fontSize="32" />
            </div>
            <h6 className="text-center font-roboto pt-1">Dark</h6>
          </section>
          <section className="px-2">
            <div
              className={`w-32 h-16 rounded border-2 flex flex-col items-center justify-center ${
                config.type === "light" ? "border-blue-400" : ""
              }`}
              onClick={() => {
                setConfig({ ...config, type: "light" });
              }}
            >
              <BsSun fontSize="32" />
            </div>
            <h6 className="text-center font-roboto pt-1">Light</h6>
          </section>
        </div>
      </section>
    </div>
  );
}
