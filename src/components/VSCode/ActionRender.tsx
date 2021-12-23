import { TStudioActions } from "@lib/types";
import { actionState } from "@recoil/atoms/action";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

export interface ActionRenderProps {
  action: TStudioActions;
  children: ReactNode;
}

export default function ActionRender({ action, children }: ActionRenderProps) {
  const actionvalue = useRecoilValue(actionState);

  if (actionvalue !== action) {
    return null;
  }
  return <>{children}</>;
}
