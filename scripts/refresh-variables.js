const fs = require("fs");

const variableFiles = fs.readdirSync("./variables");

const generatedNote = `//
// **NOTE**: Do not edit directly! This file is generated using \`yarn refresh-variables\`
//
`;

const keys = [];

variableFiles.forEach((file) => {
  const variableFile = JSON.parse(
    fs.readFileSync(`./variables/${file}`, "utf-8")
  );
  keys.push(...Object.keys(variableFile));
});


fs.writeFileSync(
  "./src/lib/generated/variables.ts",
  `${generatedNote}

export type ValidVariables = "${keys.join('" | "')}";
`
);
