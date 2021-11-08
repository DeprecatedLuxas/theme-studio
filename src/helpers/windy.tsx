// Code taken and modified from https://github.com/MathiasGilson/Tailwind-Styled-Component

import { WindyElement, IntrinsicElements } from "@lib/types";
import { ComponentType, forwardRef } from "react";
import elements from "./elements";
import classes from "tailwindcss-classnames";




const cleanTemplate = (
  template: TemplateStringsArray,
  inheritedClasses: string = ""
) => {
  const newClasses: string[] = template
    .toString()
    .trim()
    .replace(/\s{2,}/g, " ")
    .split(" ")
    .filter((c) => c !== ",");

  const inheritedClassesArray: any = inheritedClasses
    ? inheritedClasses.split(" ")
    : [];

  return classes(
    ...inheritedClassesArray
      .concat(newClasses) // add new classes
      .filter((c: string) => c !== " ") // remove empty classes
      .filter((v: string, i: number, arr: string[]) => arr.indexOf(v) === i) // remove duplicate
  ).split(" ");
};

function parseTailwindClasses(
  classes: string[],
  ...args: (string | undefined | null)[]
) {
  return classes
    .reduce((sum, n) => {
      return `${sum} ${n}`;
    }, args.join(" "))
    .trim()
    .replace(/\s{2,}/g, " ");
}

const windyElement = <P extends { className?: string }, E = any>(
  Tag: ComponentType<P>
): WindyElement<P, E> => {
  return <K extends {}>(
    element: TemplateStringsArray,
    ...args: ((props: P & K) => string | undefined | null)[]
  ) =>
    forwardRef<E, P & K>(function WindyElement(props, ref) {
      return (
        <Tag
          {...(Object.fromEntries(
            Object.entries(props).filter(([key]) => key.charAt(0) !== "$")
          ) as P)}
          ref={ref}
          className={parseTailwindClasses(
            cleanTemplate(element, props.className),
            ...args.map((t) => t(props))
          )}
        />
      );
    });
};

const intrinsicElements: IntrinsicElements = elements.reduce(
  <K extends keyof JSX.IntrinsicElements>(
    acc: IntrinsicElements,
    domElement: K
  ) => ({
    ...acc,
    [domElement]: windyElement(
      domElement as unknown as React.ComponentType<JSX.IntrinsicElements[K]>
    ),
  }),
  {} as IntrinsicElements
);

const windy = Object.assign(windyElement, intrinsicElements);

export default windy;
