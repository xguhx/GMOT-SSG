/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");
const writeFile = require("./writeFile");
const htmlAssembler = require("./htmlAssembler");

module.exports = htmlMaker = (
  txtInput,
  argv_o,
  argv_s,
  filePath = ".",
  argv_l = "en-CA"
) => {
  //Ignore non txt files

  if (path.extname(txtInput) != ".txt" && path.extname(txtInput) != ".md") {
    //Console.error
    console.log("File ignored, not a txt or md format: ", txtInput);
    return false;
  }

  fs.readFile(
    `${path.normalize(filePath)}/${txtInput}`,
    "utf8",
    (err, lines) => {
      if (err) {
        console.error(err);
        return false;
      }
      let content = htmlAssembler(lines, txtInput, argv_s, argv_l);

      writeFile(argv_o, txtInput, content);
      return;
    }
  );
  return true;
};
