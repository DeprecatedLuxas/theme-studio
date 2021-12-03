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
      const variable = variableFile[key];

      if (variable.category || variable.action) {
        const actionPrefix = variable.category
          .split(" ")
          .join("")
          .toLowerCase();
        actions.push(`${actionPrefix}.${variable.action}`);
      }
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
