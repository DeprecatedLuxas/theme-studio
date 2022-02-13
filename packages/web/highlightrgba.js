const jsg = require("./variables/currentvsvariables.json");
const tinycolor = require("tinycolor2");
const fs = require("fs");

jsg.forEach((e) => {
  if (e.defaults === null) return;
  Object.keys(e.defaults).forEach((key) => {
    if (e.defaults[key] === null) return;
    if (typeof e.defaults[key] === "object") {
      if (e.defaults[key].hasOwnProperty("rgba")) {
        e.defaults[key]["gg"] = tinycolor(e.defaults[key].rgba).toHex8String();
      }
    }
  });
});

fs.writeFileSync(
  "./variables/currentvsvariables.json",
  JSON.stringify(jsg, null, 2)
);
