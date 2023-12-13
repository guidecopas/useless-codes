import { exec } from "child_process";
import fs from "fs";
import { tempDirFile } from "./createTempFile";
import { pathLocalFiles } from "./constants";

const filter = "acrusher=level_in=4:level_out=8:bits=4:mode=log:aa=1";
const media = fs.readFileSync(pathLocalFiles + "/temp/audio.mp3", { encoding: "base64" });
const buffer = Buffer.from(media, "base64");
const [fileInputPath, fileOutputPath] = [tempDirFile("mp3"), tempDirFile("mp3")];
fs.writeFileSync(fileInputPath, buffer);

exec(`ffmpeg -i "${fileInputPath}" -af "${filter}" -f mp3 "${fileOutputPath}"`, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Audio modified successfully");
});