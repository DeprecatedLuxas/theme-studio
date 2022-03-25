import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

export function InputEditor() {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        allowComments: true,
        trailingCommas: "ignore",
      });
    }
  }, [monaco]);

  return (
    <div className="w-full h-full">
      <Editor
        defaultLanguage="json"
        theme="vs-dark"
        options={{
          fontFamily:
            '"Cascadia Code", "Jetbrains Mono", "Fira Code", "Menlo", "Consolas", monospace',
          fontLigatures: true,
          fontSize: 14,
          lineHeight: 24,
          minimap: { enabled: false },
          tabSize: 2,
        }}
        defaultValue="// some comment"
      />
    </div>
  );
}
