import { useCallback, useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import Saturation from "./Saturation";

interface ColorPickerProps {
  color?: string;
  presetColors?: false | string[];
  onChange?: (color: string) => void;
}

export default function ColorPicker({
  color,
  presetColors,
  onChange,
}: ColorPickerProps) {
  const [hsva, setHsva] = useState({ h: 209, s: 36, v: 90, a: 1 });

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
    <div
      style={{
        background: "rgb(255, 255, 255)",
        borderRadius: 4,
        boxShadow:
          "rgb(0 0 0 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 15%) 0px 8px 16px",
        width: 218,
      }}
    >
      <div style={{ padding: "10px 10px 8px" }}>
        <Saturation
          hsva={hsva}
          onChange={(newColor) =>
            handleChange({ ...hsva, ...newColor, a: hsva.a })
          }
        />
      </div>
    </div>
  );
}
