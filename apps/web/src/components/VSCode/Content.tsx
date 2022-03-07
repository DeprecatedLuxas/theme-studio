import Element from "./Element";

export default function Content() {
  return <Element className="h-full" bind={["bg@editor.background"]}></Element>;
}
