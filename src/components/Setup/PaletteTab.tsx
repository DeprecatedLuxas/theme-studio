import { Palette } from "@lib/types";
import { useState } from "react";

export default function PaletteTab() {
  const maxColors = 12;

  const [colors, setColors] = useState<Palette[]>([]);
  return (
    <div className="flex justify-between">
      <div className="w-60 bg-green-700 h-48">
        <button
          disabled={colors.length >= maxColors}
          onClick={() => {
            const newColor = `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`;
            setColors([...colors, newColor]);
          }}
        >
          Add new color
        </button>
      </div>
      <div className="w-48 bg-green-700">
        <h1 className="text-xl font-roboto mb-4">Your Palette</h1>
        <div className="grid grid-cols-3 gap-3">
          {colors.map((color, index) => (
            <div
              key={`palette-${index}`}
              className="w-8 h-8"
              style={{
                backgroundColor: color,
              }}
              onClick={() => {
                setColors([
                  ...colors.slice(0, index),
                  ...colors.slice(index + 1),
                ]);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
