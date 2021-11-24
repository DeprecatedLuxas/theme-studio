import { useMemo } from "react";

interface SaturationPointerProps {
  top?: string;
  left: string;
  color?: string;
}

export default function SaturationPointer({
  top,
  left,
  color,
}: SaturationPointerProps) {
  return useMemo(
    () => (
      <div
        className="absolute"
        style={{
          top,
          left,
        }}
      >
        <div
          className="w-2 h-2 border border-white rounded-full picker-pointer"
          style={{
            backgroundColor: color,
          }}
        />
      </div>
    ),
    [top, left, color]
  );
}
