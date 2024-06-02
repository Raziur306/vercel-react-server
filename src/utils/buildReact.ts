import { exec, spawn } from "child_process";
import path from "path";

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
