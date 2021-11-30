import Button from "@components/Button";
import { setupState } from "@recoil/atoms/setup";
import { BsPlus } from "react-icons/bs";
import { useRecoilState } from "recoil";

export default function PaletteTab() {
  const [config, setConfig] = useRecoilState(setupState);
  const maxColors = 12;

  return (
    <div className="flex flex-col">
      <h1 className="font-roboto mb-4 text-3xl font-semibold">Palette</h1>

      <section className="mb-4">
        <h4>Your Palette</h4>
        <div className="rounded bg-gray-200 grid grid-cols-4 place-items-center gap-4 py-5">
          {config.palette &&
            config.palette.map((color, index) => (
              <div
                key={`palette-${index}`}
                className="w-10 h-10 rounded cursor-pointer bg-gray-400 flex items-center justify-center"
                style={{
                  backgroundColor: color,
                }}
                onClick={() => {
    
                  /*                  setConfig({
                    ...config,
                    palette: [
                      ...config.palette.slice(0, index),
                      ...config.palette.slice(index + 1),
                    ],
                  }); */
                }}
              >
                {color === "" && <BsPlus className="text-3xl text-gray-800" />}
              </div>
            ))}
        </div>
      </section>
      {/* <div>
        <Button>Bulk Add</Button>
        <Button>Import</Button>
      </div> */}
    </div>
  );
}
