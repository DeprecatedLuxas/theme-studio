import { Interaction } from "@lib/types";
import { CSSProperties, forwardRef, useMemo, useRef } from "react";
import Interactive from "./Interactive";
import tinycolor from "tinycolor2";
import SaturationPointer from "./SaturationPointer";

export interface SaturationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  hsva: tinycolor.ColorFormats.HSVA;
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
  radius?: CSSProperties["borderRadius"];
  onChange?: (newColor: tinycolor.ColorFormats.HSVA) => void;
}

const Saturation = forwardRef<HTMLDivElement, SaturationProps>(
  function Saturation(props, ref) {
    const {
      hsva,
      onChange,
      height = 200,
      width = 200,
      radius = 0,
      ...rest
    } = props;

    const containerStyle: React.CSSProperties = {
      width,
      height,
      borderRadius: radius,
      ...rest.style,
      position: "relative",
    };

    const handleChange = (interaction: Interaction, event: MouseEvent) => {
      onChange &&
        onChange({
          h: hsva.h,
          s: interaction.left * 100,
          v: (1 - interaction.top) * 100,
          a: hsva.a,
        });
    };

    return (
      <Interactive
        style={{
          position: "absolute",
          inset: 0,
          cursor: "crosshair",
          backgroundImage: `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${hsva.h}, 100%, 50%))`,
          ...containerStyle,
        }}
        ref={ref}
        onMove={handleChange}
        onDown={handleChange}
      >
        <SaturationPointer
          top={`${100 - hsva.v}%`}
          left={`${hsva.s}%`}
          color={tinycolor(hsva).toHslString()}
        />
      </Interactive>
    );
  }
);
export default Saturation;
