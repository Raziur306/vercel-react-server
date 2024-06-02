import { exec, spawn } from "child_process";
import path from "path";
import { getAllFiles } from "./getAllFiles";
import { uploadFileCloud } from "./cloudUpload";

export const buildReact = async (id: string) => {
  console.log("Build Process started..");
  return new Promise((resolve) => {
    const pathDir = path.join(__dirname, `../../downloads/${id} `);
    const childProcess = exec(`cd ${pathDir} && npm install && npm run build`);
    childProcess.stdout?.on("data", (data) => {
      console.log(data);
    });

    childProcess.stderr?.on("data", (data: any) => {
      console.log(data);
    });
    childProcess.on("close", (code) => {
      resolve("");
    });
  });
};

export const uploadFinalBuild = async (id: string) => {
  try {
    console.log("uploading build project...");
    const buildDir = path.join(__dirname, "../../downloads/", id, "/build");

    const allFiles = await getAllFiles(buildDir);

    allFiles.forEach(async (file) => {
      await uploadFileCloud(`build/${id}${file.slice(buildDir.length)}`, file);
    });

    console.log(`All build file uploaded successfully ✔`);
  } catch (error) {
    console.log(error);
  }
};
