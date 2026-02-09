// generateAssets.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// مسار __dirname في ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicFolder = path.join(__dirname, "public/assets");
const outputFile = path.join(__dirname, "src/ALL_ASSETS.js");

function getAllFiles(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      // حول المسار ليبدأ من public/
      files.push(fullPath.replace(__dirname + "/public", ""));
    }
  });
  return files;
}

const allAssets = getAllFiles(publicFolder);

const fileContent = `export const ALL_ASSETS = ${JSON.stringify(allAssets, null, 2)};`;

fs.writeFileSync(outputFile, fileContent);
console.log("ALL_ASSETS.js تم إنشاؤه بنجاح!");
