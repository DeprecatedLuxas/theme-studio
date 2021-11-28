import InputSection from "./InputSection";
import TypeSection from "./TypeSection";

export default function GeneralTab() {
  return (
    <div>
      <h1 className="font-roboto mb-4 text-3xl font-semibold">General</h1>
      <InputSection />
      <TypeSection />
    </div>
  );
}
