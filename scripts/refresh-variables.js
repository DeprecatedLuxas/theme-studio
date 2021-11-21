const fs = require("fs");

const variableFiles = fs.readdirSync("./variables");

const generatedNote = `//
// **NOTE**: Do not edit directly! This file is generated using \`yarn refresh-variables\`
//
`;

const keys = [];
const categories = [];

variableFiles.forEach((file) => {
  console.log("Generated:", file);
  const variableFile = JSON.parse(
    fs.readFileSync(`./variables/${file}`, "utf-8")
  );
  if (variableFile.exclude) {
    return;
  }
  Object.keys(variableFile).forEach((key) => {
    const value = variableFile[key];
    let newKey = key;
    if (value.hover) {
      newKey = `h:${key}`;
    }
    if (value.category && !categories.includes(value.category))
      categories.push(value.category);
    keys.push(newKey);
  });
});

fs.writeFileSync(
  "./src/lib/generated/variables.ts",
  `${generatedNote}

export type Variables = "${keys.join('" | "')}";
export type VariablePossibleCategories = "${categories.join('" | "')}";
`
);
