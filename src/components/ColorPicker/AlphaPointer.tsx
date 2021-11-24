import { HTMLAttributes, useMemo } from "react";

export interface AlphaPointerProps extends HTMLAttributes<HTMLDivElement> {
  left: string;
  color: string;
}

export default function AlphaPointer({ left, color }: AlphaPointerProps) {
  return useMemo(
    () => (
      <div
        className="absolute"
        style={{
          left,
        }}
      >
        <div
          className="w-2 h-2 border border-white rounded-full"
          style={{
            transform: "translateY(1px)",
            boxShadow: "rgb(0 0 0 / 37%) 0px 1px 4px 0px",

            backgroundColor: color,
          }}
        />
      </div>
    ),
    [left, color]
  );
}
