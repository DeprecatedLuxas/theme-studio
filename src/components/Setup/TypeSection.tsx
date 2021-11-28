import { BsSun, BsMoon } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";

export default function TypeSection() {
  const [config, setConfig] = useRecoilState(setupState);

  return (
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
  );
}
