import { useRecoilState } from "recoil";
import { setupState } from "src/recoil/atoms/setup";

export default function InputSection() {
  const [config, setConfig] = useRecoilState(setupState);

  return (
    <section className="mb-8">
      <label className="block font-roboto">Theme Name</label>
      <input
        name="Theme Name"
        placeholder="Theme Name"
        className="w-full min-w-0 outline-none relative appearance-none px-4 h-10 rounded-md border border-gray-400 font-roboto"
        defaultValue={config.name}
        onChange={(e) => {
          setConfig({
            ...config,
            name:
              (e.target.value.trim().length > 0
                ? e.target.value.trim()
                : "Untitled") || "Untitled",
          });
        }}
      />
    </section>
  );
}
