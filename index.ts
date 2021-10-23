import { FileHelper } from "./utils/fileHelper";
import { IpfsHelper } from "./utils/ipfsHelper";
import { MamHelper } from "./utils/mamHelper";

/**
 * Main function
 */
async function main(): Promise<void> {
    // fetch the sample file we have
    const fileHelper = new FileHelper();
    const file = fileHelper.fetchFile();

    let hash;
    // store the file on ipfs and get the location of the file
    if (file) {
        const ipfsHelper = new IpfsHelper();
        hash = await ipfsHelper.addFile(file);
    }

    if (hash) {
        // store the hash on the tangle
        const now = new Date();

        const date = `${now.getFullYear()}-${(now.getMonth() + 1)}-${now.getDate()}`;
        const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        const message = {
            filename: "sample.txt",
            date: `Date: ${date}, time: ${time} `,
            hash: hash
        };

        const mamHelper = new MamHelper();
        await mamHelper.create(message);
    }

}

// tslint:disable-next-line: no-floating-promises
main();
