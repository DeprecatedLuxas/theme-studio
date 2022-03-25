import { InputEditor } from "@components/Customizer";
import Editor, { useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useEffect } from "react";

export default function Customizer() {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        allowComments: true,
      });
    }
  }, [monaco]);
  return <InputEditor />;
}
