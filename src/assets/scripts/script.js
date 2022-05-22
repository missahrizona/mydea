// C:\Users\marcg\Code\girlcodeapps-workspace\ideacollab.ui-primeng\src\assets\images\tmp

const fs = require("fs");
const path = require("path");

let files = fs.readdirSync(path.join(__dirname, "..", "images"));
files = files.filter((filename) => filename.indexOf("bg-") != -1);

let newfiles = [];

for (let i = 0; i < files.length; i++) {
  let oldfile = path.join(__dirname, "..", "images", files[i]);
  newfiles.push(path.join(__dirname, "..", "images", `bg-${i}.jpg`));
  let newfile = path.join(__dirname, "..", "images", `bg-${i}.jpg`);

  fs.renameSync(oldfile, newfile);
}

console.log(newfiles);
