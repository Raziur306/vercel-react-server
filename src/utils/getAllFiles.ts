import fs from "fs";
import path from "path";

export const getAllFiles = async (pathDir: string) => {
  const files = fs.readdirSync(pathDir);
  let fileList: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(pathDir, file);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      const nestedFiles = await getAllFiles(filePath);
      fileList = fileList.concat(nestedFiles);
    } else {
      fileList.push(filePath);
    }
  }


  return fileList;
};
