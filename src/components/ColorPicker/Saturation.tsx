import { Interaction } from "@lib/types";
import { forwardRef, useMemo, useRef } from "react";
import Interactive from "./Interactive";
import tinycolor from "tinycolor2";

export interface PointerProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  top?: string;
  left: string;
  color?: string;
}

const BOXSHADOW =
  "rgb(255 255 255) 0px 0px 0px 1.5px, rgb(0 0 0 / 30%) 0px 0px 1px 1px inset, rgb(0 0 0 / 40%) 0px 0px 1px 2px";

export const Pointer = ({
  className,
  color,
  left,
  top,
  prefixCls,
}: PointerProps): JSX.Element => {
  const style: React.CSSProperties = {
    position: "absolute",
    top,
    left,
  };
  return useMemo(
    () => (
      <div className={`${prefixCls}-pointer ${className || ""}`} style={style}>
        <div
          className={`${prefixCls}-fill`}
          style={{
            width: 6,
            height: 6,
            transform: "translate(-3px, -3px)",
            boxShadow: BOXSHADOW,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      </div>
    ),
    [top, left, color, className, prefixCls]
  );
};

export interface SaturationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  hsva: tinycolor.ColorFormats.HSVA;
  onChange?: (newColor: tinycolor.ColorFormats.HSVA) => void;
}

const Saturation = forwardRef<HTMLDivElement, SaturationProps>(
  function Saturation(props, ref) {
    const { hsva, onChange, ...rest } = props;

    const containerStyle: React.CSSProperties = {
      width: 200,
      height: 200,
      borderRadius: 0,
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
          // source: 'hsv',
        });
    };

    const comProps = {
      top: `${100 - hsva.v}%`,
      left: `${hsva.s}%`,
      color: tinycolor(hsva).toHslString(),
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
        <Pointer {...comProps} />
      </Interactive>
    );
  }
);
export default Saturation;
