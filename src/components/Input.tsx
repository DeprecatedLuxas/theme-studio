import { ComponentPropPlacement } from "@lib/types";
import {
  HTMLAttributes,
  PropsWithChildren,
  useRef,
  MouseEvent,
  ChangeEvent,
} from "react";
import { TTextColor } from "tailwindcss-classnames";

export interface InputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  addon?: string;
  addonPlacement?: Extract<ComponentPropPlacement, "left" | "right">;
  label?: string;
  w?: boolean;
  labelColor?: TTextColor;
  clearable?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  addon,
  addonPlacement = "left",
  label,
  labelColor,
  clearable,
  onChange,
  children,
  w = false,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };
  return (
    <div className={`inline-block p-0 m-0 min-h-9 h-full ${w && "w-full"}`}>
      {(label || children) && (
        <InputLabel color={labelColor}>{label || children}</InputLabel>
      )}
      <div className="inline-flex items-center h-9 w-full">
        {addon && addonPlacement !== "right" && (
          <InputAddon placement={addonPlacement}>{addon}</InputAddon>
        )}
        <div
          className={`inline-flex items-center align-middle h-full flex-1 rounded-md border border-gray-400 transition-input ${
            !addon
              ? "rounded-md"
              : addonPlacement === "right"
              ? "rounded-tr-none rounded-br-none"
              : "rounded-tl-none rounded-bl-none"
          }`}
        >
          <input
            {...rest}
            onChange={handleChange}
            ref={inputRef}
            className="p-0 border-none w-full min-w-0 outline-none rounded-none bg-transparent my-1 mx-3"
          />
          {clearable && (
            <InputClear
              visible={Boolean(
                inputRef.current && inputRef.current.value !== ""
              )}
              onClick={(e: MouseEvent<HTMLDivElement>) => {
                const fakeChangeEvent = {
                  ...e,
                  target: inputRef.current!,
                  currentTarget: inputRef.current!,
                };
                fakeChangeEvent.target.value = "";

                onChange && onChange(fakeChangeEvent);
              }}
            />
          )}
        </div>
        {addon && addonPlacement === "right" && (
          <InputAddon placement={addonPlacement}>{addon}</InputAddon>
        )}
      </div>
    </div>
  );
}

export interface InputLabelProps {
  color?: TTextColor;
}

const InputLabel = ({
  color = "text-gray-700",
  ...props
}: PropsWithChildren<InputLabelProps>) => (
  <label className={`block mb-0.5 font-roboto ${color}`} {...props} />
);

export interface InputAddonProps {
  placement?: Extract<ComponentPropPlacement, "left" | "right">;
}

const InputAddon = ({
  placement,
  ...props
}: PropsWithChildren<InputAddonProps>) => (
  <span
    className={`inline-flex items-center h-full pointer-events-none m-0 py-0 px-3 text-gray-400 bg-gray-900 border border-gray-400 leading-none ${
      placement === "right"
        ? "rounded-tr-md rounded-br-md"
        : "rounded-tl-md rounded-bl-md"
    }`}
    {...props}
  />
);

export interface InputClearProps {
  visible: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const InputClear = ({ visible, onClick }: InputClearProps) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onClick && onClick(e);
  };
  return (
    <div
      onClick={handleClick}
      className={`inline-flex h-full items-center justify-center cursor-pointer m-0 p-0 ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
        className="text-gray-500 w-6 h-6 hover:text-gray-700"
      >
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    </div>
  );
};
