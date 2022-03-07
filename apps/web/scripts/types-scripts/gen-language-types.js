(async () => {
  const fs = require("fs");
  const axios = require("axios");


  const data = await (await axios.get("http://104.248.169.204:8080/languages")).data;


  const languages = Object.keys(data);


  const generatedNote = `//
// **NOTE**: Do not edit directly! This file is generated using \`yarn gen-types\`
//
`;


  fs.writeFileSync(
    "./generated/languages.ts",
    `${generatedNote}

export type Languages = "${languages.join('" | "')}";
`
  );
})();
