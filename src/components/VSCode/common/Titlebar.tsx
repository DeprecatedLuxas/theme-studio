/* eslint-disable @next/next/no-img-element */

import useVSC from "@hooks/useVSC";
import Element from "./Element";

export default function TitleBar() {
  const { functional } = useVSC();

  return (
    <Element className="flex items-center justify-center h-titlebar text-titlebar relative"
    bind={[]}
  >
      <Element
        className="h-full flex justify-center items-center"
        style={{
          width: 35,
        }}
      >
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIWSURBVHgBjVM9aFNRFD73JpH+UE2l1SgoyeAPYm10KLoYAl3iJggODlZnhxZBF/U9jbUBlcRBnCSbk4N0KNrBl4A4OLQoLc2Wp3UQxBKKoX0v957jfbe+5iUtbQ58wz3vnu987zvnMugwUk9KF/gemhk4OfLOWXfy01f2f/PyrJPi81OzY4zx16zh8NjwRZ1DIguBj/PdikcmZ+8isqKUxAUSCAQNJJYGorImSL5aim9XnMx+MIWknJAIPiRBEFF++sWiiS5Wh/KLU8HiIeN9DiUZG1038dFX4IOdKixUgUArIAZVgTgaXvnxgHF+PUhIwO4sPco8HX27SsF8GKmRJopYROSRJBjKBckj3SAcRR/y7tics7FKNlP2Dl7XYPDKxFmbOY20kmdrmRDqFn2HQER6QbpuSQiZqmQvlf0CZUMLwl5yvWZ7rgLsO6wyXRs3ewaBegb7QyhbJiWoTcHBe9MJF7klkMXFn2UQa6ubpkmkYRe4FZucyzQVUAs4raElBMXVuJR8/gl/LSeUkS8DzsfVwswcyM6bvoIgwihZUU1XfWSFlfzlif+Nbg08/vobEc2AWqP//ueUbDNRr3J0vBitFW7UoC32mvOGGmCTpFGHI8fPbCXYKXofzt0mCc/0wf0LR080CdTof+76FurGueeC8Jrypa49af5/SY38akevUYfxJdkl6E0sfuw7hCI5+2af3o1/V+hARIlaA00AAAAASUVORK5CYII="
          alt="VSCode Logo"
          width="16"
          height="16"
        />
      </Element>
      <Element className="flex items-center justify-start">
        <Element className="px-2">File</Element>
        <Element className="px-2">Edit</Element>
        <Element className="px-2">Selection</Element>
        <Element className="px-2">View</Element>
        <Element className="px-2">Go</Element>
        <Element className="px-2">Run</Element>
        <Element className="px-2">Terminal</Element>
        <Element className="px-2">Help</Element>
      </Element>

      <Element className="text-center flex-1">
        App.tsx - VSCode Theme - Visual Studio Code
      </Element>
    </Element>
  );
}
