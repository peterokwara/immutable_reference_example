import fs from "fs";

/**
 * Class to handle files
 */
export class FileHelper {
    /**
     * Function to fetch a file from the sample directory
     * @returns The fetched file
     */
    public fetchFile(): Buffer {
        const file = fs.readFileSync("./sample/sample.txt");
        if (file) {
            return file;
        }
    }
}
