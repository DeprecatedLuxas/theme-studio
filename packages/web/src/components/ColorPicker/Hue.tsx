import { forwardRef } from "react";
import Alpha, { AlphaProps } from "./Alpha";

interface HueProps extends Omit<AlphaProps, "hsva" | "onChange"> {
  onChange?: (newHue: { h: number }) => void;
  hue: number;
}

const Hue = forwardRef<HTMLDivElement, HueProps>((props, ref) => {
  const { hue = 0, onChange, ...rest } = props;
  return (
    <Alpha
      ref={ref}
      {...rest}
      background={`linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)`}
      hsva={{ h: hue, s: 100, v: 100, a: hue / 360 }}
      onChange={(_, interaction) => {
        onChange && onChange({ h: 360 * interaction.left });
      }}
    />
  );
});

Hue.displayName = "TStudioHue";


export default Hue;
