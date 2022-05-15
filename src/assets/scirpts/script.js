// C:\Users\marcg\Code\girlcodeapps-workspace\ideacollab.ui-primeng\src\assets\images\tmp

const fs = require("fs");
const path = require("path");

let files = fs.readdirSync(path.join(__dirname, "tmp"));

for (let i = 0; i < files.length; i++) {
  let oldfile = path.join(__dirname, "tmp", files[i]);
  let newfile = path.join(__dirname, `bg-${i}.jpg`);

  fs.renameSync(oldfile, newfile);
}
