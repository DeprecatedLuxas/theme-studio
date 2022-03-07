import { Arrayable, Keybind } from "@lib/types";
import { KeyModifiers } from "@lib/keybinds";
import useEventListener from "./use-event-listener";

function handle(event: KeyboardEvent, keybind: Keybind) {
  if (event.defaultPrevented) return;

  const hasModifier = keybind.keys.some(key => KeyModifiers.has(key)) || false;

  


  keybind.exec(event);
}

export default function useKeybind<T extends Window | Document | HTMLElement>(
  target: T,
  keybinds: Arrayable<Keybind>
) {
  const keybindings = Array.isArray(keybinds) ? keybinds : [keybinds];
  useEventListener(target, {
    type: "keydown",
    handler: (event: KeyboardEvent) => {
      keybindings.forEach((keybind: Keybind) => {
        handle(event, keybind);
      });
    },
  });
}
