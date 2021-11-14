import { Interaction } from "@lib/types";
import {
  createElement,
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  useCallback,
} from "react";
import tinycolor from "tinycolor2";
import AlphaPointer, { AlphaPointerProps } from "./AlphaPointer";
import Interactive from "./Interactive";

const BACKGROUND_IMG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==";

export interface AlphaProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  hsva: tinycolor.ColorFormats.HSVA;
  pointer?: ({ left }: AlphaPointerProps) => JSX.Element;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: React.CSSProperties["borderRadius"];
  background?: string;
  innerProps?: React.HTMLAttributes<HTMLDivElement>;
  bgProps?: React.HTMLAttributes<HTMLDivElement>;
  onChange?: (newAlpha: { a: number }, offset: Interaction) => void;
}

const Alpha = forwardRef<HTMLDivElement, AlphaProps>(function Alpha(
  props,
  ref
) {
  const {
    hsva,
    background,
    bgProps = {},
    innerProps = {},
    onChange,
    pointer,
    radius = 0,
    width,
    height = 16,
    style,
    ...rest
  } = props;

  const handleChange = useCallback(
    (offset: Interaction) => {
      onChange && onChange({ ...hsva, a: offset.left }, offset);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hsva]
  );

  // const colorTo = hsvaToHslaString(Object.assign({}, hsva, { a: 1 }));
  const innerBackground = `linear-gradient(to right, rgba(244, 67, 54, 0) 0%, ${tinycolor(
    hsva
  ).toHslString()} 100%)`;

  const pointerProps = {
    left: `${hsva.a * 100}%`,
    color: tinycolor(hsva).toHslString(),
  };
  return (
    <div
      {...rest}
      style={{
        borderRadius: radius,
        background: `url(${BACKGROUND_IMG}) left center`,
        backgroundColor: "#fff",
        ...style,
        position: "relative",
        ...{ width, height },
      }}
      ref={ref}
    >
      <div
        {...bgProps}
        style={{
          inset: 0,
          position: "absolute",
          background: background || innerBackground,
          borderRadius: radius,
          ...bgProps.style,
        }}
      />
      <Interactive
        {...innerProps}
        style={{
          ...innerProps.style,

          inset: 0,
          zIndex: 1,
          position: "absolute",
        }}
        onMove={handleChange}
        onDown={handleChange}
      >
        {createElement(pointer || AlphaPointer, {
          ...pointerProps,
        })}
      </Interactive>
    </div>
  );
});

export default Alpha;
