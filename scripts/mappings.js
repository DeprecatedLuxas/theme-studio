const axios = require("axios");
const fs = require("fs");
function indexOfStr(str, strr) {
  return str.indexOf(strr) + strr.length;
}

const mappingObjects = [
  {
    url: "https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/src/icons/fileIcons.ts",
    raw_name: "file",
    name: "fileIcons",
    type: "FileIcons",
    replace: true,
  },
  // {
  //   url: "https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/src/icons/folderIcons.ts",
  //   raw_name: "folder",
  //   name: "folderIcons",
  //   type: "FolderTheme[]",
  //   replace: true,
  // },
  // {
  //   url: "https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/src/icons/languageIcons.ts",
  //   raw_name: "language",
  //   name: "languageIcons",
  //   type: "LanguageIcon[]",
  //   replace: false,
  // },
];

const data = {};

async function getMappings(replacements) {
  await Promise.all(
    mappingObjects.map(async ({ url, name, type, replace, raw_name }) => {
      try {
        const mapping = await getMapping(
          url,
          name,
          type,
          replace,
          replacements
        );

        // fs.writeFileSync(
        //   "./folderIcons.js",
        //   "const folderIcons = " + mapping + "\n\nmodule.exports = folderIcons;"
        // );

        console.log(typeof mapping);
        data[raw_name] = mapping;
      } catch (e) {
        console.log(e);
      }
    })
  );
}

async function getMapping(url, name, type, replace, replacements) {
  try {
    const { data } = await axios.get(url);

    let content = data.substring(
      indexOfStr(data, `export const ${name}: ${type} = `)
    );

    if (replace) {
      Object.keys(replacements).forEach((key) => {
        const regex = new RegExp(`IconPack.${key}`, "g");
        content = content.replace(regex, replacements[key]);
      });
    }
    

    return content;
  } catch (error) {
    console.log(error);
  }
}

function parse() {}

async function getIconPackReplacements() {
  const url =
    "https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/src/models/icons/iconPack.ts";
  try {
    const { data } = await axios.get(url);
    let content = data
      .substring(indexOfStr(data, `export enum IconPack {`))
      .replace(/\n}/g, "");

    const iconPacks = content.split("\n");
    iconPacks.shift();
    iconPacks.pop();

    // Because if vue is before vuex, vuex will be replaced by vue
    iconPacks.reverse();

    const replacementsObject = {};

    iconPacks.forEach((iconPack) => {
      const iconPackName = iconPack.split(" = ")[0];
      const iconPackValue = iconPack.split(" = ")[1];
      replacementsObject[iconPackName.trim()] = iconPackValue
        .replace(/,/g, "")
        .replace(/'/g, '"');
    });

    return replacementsObject;
  } catch (e) {
    console.log(e);
  }
}

(async () => {
  const replacements = await getIconPackReplacements();
  console.log(replacements);
  await getMappings(replacements);

  // console.log(data);
  fs.writeFileSync("./mappings.json", JSON.stringify(data));
})();
