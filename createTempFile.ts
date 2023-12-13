import Crypto from "crypto";
import fs from "fs";
import path from "path";
import { pathLocalFiles } from "./constants";

export function createRandomFilename(ext: string = "png"): string {
    const filename = `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.${ext}`;
    return filename;
}

export function tempDirFile(ext: string = "jpg"): string {
    const tempFile = path.join(pathLocalFiles + "/temp/", createRandomFilename(ext));
    setTimeout(() => {
        if (fs.existsSync(tempFile)) {
            fs.unlink(tempFile, () => {});
        }
    }, 1000 * 30);
    return tempFile;
}
