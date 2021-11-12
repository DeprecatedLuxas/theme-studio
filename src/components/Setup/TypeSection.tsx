import { BsSun, BsMoon } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { setupState } from "src/recoil/atoms/setup";

export default function TypeSection() {
  const [config, setConfig] = useRecoilState(setupState);

  return (
    <section>
      <label>Theme Type</label>
      <div className="grid grid-cols-3 gap-2">
        <section className="w-48 h-36 rounded-lg border-2 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <BsMoon fontSize="32" />
          </div>
          <div className="border-t-2 h-8 px-2 flex items-center">
            <input
              type="radio"
              name="type"
              defaultChecked={config.type === "dark"}
              onChange={() => {
                setConfig({ ...config, type: "dark" });
              }}
            />
            <h3 className="ml-2 font-roboto">Dark</h3>
          </div>
        </section>

        <section className="w-48 h-36 rounded-lg border-2 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <BsSun fontSize="32" />
          </div>
          <div className="border-t-2 h-8 px-2 flex items-center">
            <input
              type="radio"
              name="type"
              defaultChecked={config.type === "light"}
              onChange={() => {
                setConfig({ ...config, type: "light" });
              }}
            />
            <h3 className="ml-2 font-roboto">Light</h3>
          </div>
        </section>
      </div>
    </section>
  );
}
