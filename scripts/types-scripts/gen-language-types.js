(async () => {
  const fs = require("fs");
  const axios = require("axios");


  const data = await (await axios.get("http://localhost:8080/languages")).data;


  const languages = Object.keys(data);


  const generatedNote = `//
// **NOTE**: Do not edit directly! This file is generated using \`yarn gen-types\`
//
`;


  fs.writeFileSync(
    "./src/lib/generated/languages.ts",
    `${generatedNote}

export type Languages = "${languages.join('" | "')}";
`
  );
})();
