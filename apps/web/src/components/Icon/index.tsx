import {
  CodiconsIcons,
  FontAwesomeIcons,
  IconProviders,
  Icons,
} from "@lib/types";
import { SVGAttributes } from "react";
import { AriaRole } from "react";
import Codicons from "./Codicons";
import FontAwesome from "./FontAwesome";
export interface IconProps extends SVGAttributes<SVGElement> {
  icon?: Icons;
  from?: string;
  role?: AriaRole;
  label?: string;
  size?: string;
}

function getIconProvider(icon: Icons | undefined): IconProviders | undefined {
  if (!icon) return undefined;
  if (icon.substring(0, 2).toLowerCase() === "fa") return "FontAwesome";
  if (icon.substring(0, 3).toLowerCase() === "vsc") return "Codicons";
  return undefined;
}

function getIconsFromProvider(provider: IconProviders, icon: Icons) {
  switch (provider) {
    case "FontAwesome":
      return FontAwesome(icon as FontAwesomeIcons);
    case "Codicons":
      return Codicons(icon as CodiconsIcons);
    default:
      return null;
  }
}

export default function Icon({
  icon,
  from,
  role = "presentation",
  className,
  size,
  label,
  ...props
}: IconProps) {
  if (!icon && !from) return null;

  const provider = getIconProvider(icon);
  if (!provider) return null;

  // Very spammy.
  // if (!label && __DEV__) {
  //   console.warn("Icon component: label is not defined.");
  // }

  const iconObject = getIconsFromProvider(provider!, icon!);
  const iconSize = size || iconObject?.attributes.size || "1em";

  return (
    <svg
      {...props}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      className={className}
      viewBox={iconObject?.attributes.viewBox}
      role={role}
    >
      {iconObject?.path}
    </svg>
  );
}
