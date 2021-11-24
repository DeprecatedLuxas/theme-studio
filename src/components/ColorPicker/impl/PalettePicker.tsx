import Alpha from "@components/ColorPicker/Alpha";
import EditableInput from "@components/ColorPicker/EditableInput";
import Hue from "@components/ColorPicker/Hue";
import { Palette } from "@lib/types";
import { Fragment, useCallback, useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import Saturation from "../Saturation";

interface PalettePickerProps {
  color?: string | tinycolor.ColorFormats.HSVA;
  onChange?: (color: string) => void;
}


export default function PalettePicker({ color, onChange }: PalettePickerProps) {
  const [hsva, setHsva] = useState<tinycolor.ColorFormats.HSVA>({
    h: 209,
    s: 36,
    v: 90,
    a: 1,
  });

  useEffect(() => {
    if (typeof color === "string" && tinycolor(color).isValid()) {
      setHsva(tinycolor(color).toHsv());
    }
    if (typeof color === "object") {
      setHsva(color);
    }
  }, [color]);

  const handleChange = useCallback(
    (hsv: tinycolor.ColorFormats.HSVA) => {
      setHsva(hsv);
      onChange && onChange(tinycolor(hsv).toHexString());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hsva]
  );
  return (
    <div className="w-80">
      <div className="p-2.5">
        <Saturation
          width={"auto"}
          height={150}
          radius={5}
          hsva={hsva}
          onChange={(newColor) =>
            handleChange({ ...hsva, ...newColor, a: hsva.a })
          }
        />
        <div className="flex mt-4 flex-col">
          <Hue
            width="auto"
            height={10}
            radius={20}
            hue={hsva.h}
            innerProps={{
              style: { marginLeft: 1, marginRight: 5 },
            }}
            onChange={(newHue) => handleChange({ ...hsva, ...newHue })}
          />

          <Alpha
            width="auto"
            height={10}
            hsva={hsva}
            radius={20}
            style={{ marginTop: 8 }}
            innerProps={{
              style: { marginLeft: 1, marginRight: 5 },
            }}
            onChange={(newAlpha) => {
              handleChange({ ...hsva, ...{ a: newAlpha.a } });
            }}
          />
        </div>
        <EditableInput color={tinycolor(hsva).toHex()} />
      </div>
    </div>
  );
}
