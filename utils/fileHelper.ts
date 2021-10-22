const fs = require("fs")

export class FileHelper {
    public fetchFile(): any {
        const file = fs.readFileSync("./sample/sample.txt");
        if (file) {
            return file;
        }
    }
}