import Input from "@components/Input";
import Spacer from "@components/Spacer";
import InputSection from "./InputSection";
import TypeSection from "./TypeSection";

export default function FirstTab() {
  return (
    <div>
      <InputSection />
      {/* <Input addon={"Hello"} placeholder={"Hello"} />
      <Spacer />
      <Input addon={"Hello"} addonPlacement={"right"} placeholder={"Hello"} />
      <Spacer />
      <Input label={"Hello"} placeholder={"Hello"} />
      <Spacer />
      <Input
        label={"Hello"}
        labelColor={"text-blue-700"}
        placeholder={"Hello"}
      />
      <Spacer />
      <Input placeholder={"Hello"}>Hello</Input>
      <Spacer />
      <Input placeholder={"Hello"} labelColor={"text-blue-700"}>
        Hello
      </Input> */}
      <TypeSection />
    </div>
  );
}
