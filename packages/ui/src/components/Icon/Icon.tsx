import { Arrayable, IconObject } from "@theme-studio/core";
import {
  Children,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

const fallbackIcon: IconObject = {
  credit:
    "Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.",
  viewBox: "0 0 24 24",
  path: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z",
};

interface IIconProps {
  height?: number | string | undefined;
  width?: number | string | undefined;
  icon: IconObject;
}

export interface IconProps
  extends IIconProps,
    Omit<HTMLAttributes<SVGSVGElement>, keyof IIconProps> {}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ height, width, className, children, icon, ...rest }, ref) => {
    const _viewBox = icon.viewBox || fallbackIcon.viewBox;
    const _width = width || "1em";
    const _height = height || "1em";
    const _credit = icon.credit || fallbackIcon.credit;

    // TODO: Do something with classNames, to better support for custom styling with tailwind.

    const path = parseSVGPath(children ?? icon.path ?? fallbackIcon.path);

    return (
      <svg
        ref={ref}
        viewBox={_viewBox}
        height={_height}
        width={_width}
        data-credit={_credit}
        className={className}
        {...rest}
      >
        {path}
      </svg>
    );
  }
);

/**
 * Parses the svg path into the correct format.
 * @param inner ReactNode | string | Arrayable<ReactElement>
 * @returns ReactNode
 */
export function parseSVGPath(
  inner: ReactNode | string | Arrayable<ReactElement>
): ReactNode {
  if (typeof inner === "string") {
    return <path fill="currentColor" d={inner} />;
  }

  if (Array.isArray(inner)) {
    return Children.toArray(inner);
  }

  return inner;
}
