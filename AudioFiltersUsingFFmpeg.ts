import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

const pathLocalFiles = process.platform === "linux" ? "/home/oem/Documentos" : "D:/arquivosBot/temp"

const filter = "acrusher=level_in=4:level_out=8:bits=4:mode=log:aa=1";
const media = fs.readFileSync(pathLocalFiles + "/audio.mp3", {
    encoding: "base64",
});
    const buffer = Buffer.from(media, "base64");
    const filename = Date.now();
    const fileInputPath = pathLocalFiles + `/${filename}.mp3`;
    const fileOutputPath = pathLocalFiles + `/${filename}_modified.mp3`;
    fs.writeFileSync(fileInputPath, buffer);
    ffmpeg(fileInputPath)
        .audioFilters(filter)
        .format("mp3")
        .save(fileOutputPath)
        .on("end", () => {
            console.log("Finished");
            setTimeout(() => {
                fs.unlinkSync(fileInputPath);
                fs.unlinkSync(fileOutputPath);
            }, 1000 * 15);
        });