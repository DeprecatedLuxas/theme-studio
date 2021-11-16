import { memo } from "react";

export interface SpacerProps {
  className?: string;
  inline?: boolean;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
}

function Spacer({ className, inline, size = 1 }: SpacerProps) {
  return (
    <div
      className={`h-0.25 w-0.25 block ${
        inline ? "inline-block" : ""
      } spacer-${size} ${className}`}
    />
  );
}
export default memo(Spacer);
