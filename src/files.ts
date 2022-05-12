import fs from "fs";
import path from "path";

type GetAllFiles = {
  dirPath: string;
  arrayOfFiles: string[];
};

export const getAllFiles = ({
  dirPath,
  arrayOfFiles,
}: GetAllFiles): string[] => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles({
        dirPath: dirPath + "/" + file,
        arrayOfFiles,
      });
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};
