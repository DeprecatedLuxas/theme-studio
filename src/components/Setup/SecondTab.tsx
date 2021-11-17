import { Palette } from "@lib/types";
import { useRecoilState } from "recoil";
import { setupState } from "src/recoil/atoms/setup";
import { useCallback, useState } from "react";
import PalettePicker from "./PalettePicker";
import Button from "@components/Button";
import tinycolor from "tinycolor2";

export default function SecondTab() {
  const [config, setConfig] = useRecoilState(setupState);
  const maxColors = 12;
  const [currentColor, setCurrentColor] = useState<tinycolor.ColorFormats.HSVA>(
    {
      h: 209,
      s: 36,
      v: 90,
      a: 1,
    }
  );
  return (
    <div className="flex justify-between">
      <div>
        <PalettePicker
          color={currentColor}
          onChange={(color) => {
            setCurrentColor(tinycolor(color).toHsv());
          }}
        />
        <Button
          disabled={config.palette.length >= maxColors}
          onClick={() => {
            setConfig({
              ...config,
              palette: [
                ...config.palette,
                tinycolor(currentColor).toHexString(),
              ],
            });
          }}
        >
          Add color
        </Button>
      </div>
      <div className="w-36">
        <h1 className="text-xl font-roboto mb-4">Your Palette</h1>
        <div className="grid grid-cols-3 gap-2">
          {config.palette.map((color, index) => (
            <div
              key={`palette-${index}`}
              className="w-8 h-8 rounded-md"
              style={{
                backgroundColor: color,
              }}
              onClick={() => {
                setConfig({
                  ...config,
                  palette: [
                    ...config.palette.slice(0, index),
                    ...config.palette.slice(index + 1),
                  ],
                });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
