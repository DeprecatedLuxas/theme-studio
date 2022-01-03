import { ModifierKeysEnum } from "@lib/enums";

export const KeyModifiers: Map<"Alt" | "Control" | "Meta" | "Shift", ModifierKeysEnum> = new Map([
  ["Alt", ModifierKeysEnum.Alt],
  ["Control", ModifierKeysEnum.Control],
  ["Meta", ModifierKeysEnum.Meta],
  ["Shift", ModifierKeysEnum.Shift],
]);
