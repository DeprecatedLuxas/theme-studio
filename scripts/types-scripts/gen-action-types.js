(() => {
  const fs = require("fs");

  const variableFiles = fs.readdirSync("./variables");

  const generatedNote = `//
// **NOTE**: Do not edit directly! This file is generated using \`yarn gen-types\`
//
`;

  const actions = [""];

  variableFiles.forEach((file) => {
    const fileContents = fs.readFileSync(`./variables/${file}`, "utf-8");

    if (!fileContents) return;

    const variableFile = JSON.parse(fileContents);
    if (variableFile.exclude) {
      return;
    }
    Object.keys(variableFile).forEach((key) => {
      const value = variableFile[key];
      let newKey = key;
      if (value.action) actions.push(value.action);
    });
    console.log("Generated action types for:", file);
  });

  fs.writeFileSync(
    "./src/lib/generated/actions.ts",
    `${generatedNote}

export type TStudioActions = "${actions.join('" | "')}";
`
  );
})();
