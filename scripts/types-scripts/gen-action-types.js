(() => {
  const fs = require("fs");

  const variableFiles = fs.readdirSync("./variables");

  const generatedNote = `//
// **NOTE**: Do not edit directly! This file is generated using \`yarn gen-types\`
//
`;

  const actions = [""];

  variableFiles
    .filter((file) => file.includes(".tstudio"))
    .forEach((file) => {
      const fileContents = fs.readFileSync(`./variables/${file}`, "utf-8");

      if (!fileContents) return;

      const variableFile = JSON.parse(fileContents);

      const excluding = variableFile.exclude || [];

      Object.keys(variableFile)
        .filter((key) => !excluding.includes(key))
        .forEach((key) => {
          const variable = variableFile[key];

          if (variable.category && variable.action) {
            const actionPrefix = variable.category
              .split(" ")
              .join("")
              .toLowerCase();
            if (actions.includes(`${actionPrefix}.${variable.action}`)) return;
            actions.push(`${actionPrefix}.${variable.action}`);
          }
        });
      console.log("Generated action types for:", file);
    });
    fs.writeFileSync(
      "./generated/actions.ts",
      `${generatedNote}
  
  export type TStudioActions = "${actions.join('" | "')}";
  `
    );
})();
