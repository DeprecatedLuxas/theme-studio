import { Placement, Modifier, State } from "@popperjs/core";

export const positionArrow: Modifier<"positionArrow", any> = {
  name: "positionArrow",
  enabled: true,
  phase: "afterWrite",
  fn: ({ state }) => {
    setArrowStyles(state);
  },
};

const setArrowStyles = (state: Partial<State>) => {
  if (!state.placement) return;
  const overrides = getArrowStyle(state.placement);

  if (state.elements?.arrow && overrides) {
    Object.assign(state.elements.arrow.style, {
      [overrides.property]: overrides.value,
      width: "var(--popper-arrow-size, 8px)",
      height: "var(--popper-arrow-size, 8px)",
      zIndex: -1,
    });

    const vars: any = {
      "--popper-arrow-size-half": `calc(var(--popper-arrow-size, 8px) / 2)`,
      "--popper-arrow-offset": `calc(var(--popper-arrow-size-half) * -1)`,
    };

    for (const property in vars) {
      state.elements.arrow.style.setProperty(property, vars[property]);
    }
  }
};

const getArrowStyle = (placement: Placement) => {
  if (placement.startsWith("top")) {
    return { property: "bottom", value: "var(--popper-arrow-offset)" };
  }
  if (placement.startsWith("bottom")) {
    return { property: "top", value: "var(--popper-arrow-offset)" };
  }
  if (placement.startsWith("left")) {
    return { property: "right", value: "var(--popper-arrow-offset)" };
  }
  if (placement.startsWith("right")) {
    return { property: "left", value: "var(--popper-arrow-offset)" };
  }
};

export const innerArrow: Modifier<"innerArrow", any> = {
  name: "innerArrow",
  enabled: true,
  phase: "main",
  requires: ["arrow"],
  fn: ({ state }) => {
    setInnerArrowStyles(state);
  },
  effect:
    ({ state }) =>
    () => {
      setInnerArrowStyles(state);
    },
};

const setInnerArrowStyles = (state: State) => {
  if (!state.elements.arrow) return;

  const inner = state.elements.arrow.querySelector(
    "[data-popper-arrow-inner]"
  ) as HTMLElement | null;

  if (!inner) return;

  Object.assign(inner.style, {
    transform: "rotate(45deg)",
    background: "var(--popper-arrow-bg)",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "inherit",
    boxShadow: getBoxShadow(state.placement),
  });
};

export function getBoxShadow(placement: Placement) {
  if (placement.includes("top"))
    return `1px 1px 1px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("bottom"))
    return `-1px -1px 1px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("right"))
    return `-1px 1px 1px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("left"))
    return `1px -1px 1px 0 var(--popper-arrow-shadow-color)`;
}
