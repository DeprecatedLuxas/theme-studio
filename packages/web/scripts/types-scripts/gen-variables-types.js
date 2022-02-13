(() => {
  const fs = require("fs");

  const variableFiles = fs.readdirSync("./variables");

  const generatedNote = `//
// **NOTE**: Do not edit directly! This file is generated using \`yarn gen-types\`
//
`;

  const keys = [];
  const categories = [];

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
          const value = variableFile[key];
          let newKey = key;
          if (value.hover) {
            newKey = `h:${key}`;
          }
          if (value.category && !categories.includes(value.category))
            categories.push(value.category);
          keys.push(newKey);

          value.additional &&
            value.additional.forEach((ke) => {
              newKey = key.split("@")[1];
              keys.push(`${ke}@${newKey}`);
            });
        });
      console.log("Generated variable types for:", file);
    });

  fs.writeFileSync(
    "./generated/variables.ts",
    `${generatedNote}

export type Variables = "${keys.join('" | "')}";
export type VariablePossibleCategories = "${categories.join('" | "')}";
`
  );
})();
