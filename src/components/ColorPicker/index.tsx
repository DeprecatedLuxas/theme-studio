import Saturation from "./Saturation";

export default function ColorPicker() {
  return (
    <div className="bg-yellow-500">
      <div className="p-2">
        <Saturation hsva={{ h: 209, s: 36, v: 90, a: 1 }} />
      </div>
    </div>
  );
}
