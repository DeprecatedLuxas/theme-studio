import { useRecoilState } from "recoil";
import { setupState } from "src/recoil/atoms/setup";
import { useState } from "react";
import PalettePicker from "../ColorPicker/impl/PalettePicker";
import { Button } from "@components/Forms";

import tinycolor from "tinycolor2";
import { useBiscuitBox } from "@hooks/use-biscuit-box";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@components/Dialog";

export default function SecondTab() {
  const { isOpen, onClose, onOpen } = useBiscuitBox();

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
    <>
      <div className="flex justify-between">
        <div>
          <PalettePicker
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
          <Button onClick={onOpen} className="ml-10">Clear Palette</Button>
        </div>
        <div className="w-36">
          <h1 className="text-xl font-roboto mb-4">Your Palette</h1>
          <div className="grid grid-cols-3 gap-2">
            {config.palette.map((color, index) => (
              <div
                key={`palette-${index}`}
                className="w-8 h-8 rounded-md cursor-pointer"
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
      <Dialog isOpen={isOpen} onClose={onClose}>
        <DialogHeader>Clear Palette</DialogHeader>
        <DialogBody>
          <p className="text-white mb-2">
            Are you sure? You can&apos;t undo this action afterwards.
          </p>
        </DialogBody>

        <DialogFooter>
          <Button className="mr-4" onClick={onClose}>
            Cancel
          </Button>
          <Button
            // type="warning"
            onClick={() => {
              onClose();
              setConfig({
                ...config,
                palette: [],
              });
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
