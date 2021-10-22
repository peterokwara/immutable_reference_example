import { FileHelper } from "./utils/fileHelper";
import { IpfsHelper } from "./utils/ipfsHelper";
import { MamHelper } from "./utils/mamHelper";

async function main() {

    // fetch the sample file we have
    const fileHelper = new FileHelper();
    const file = fileHelper.fetchFile();

    // store the file on ipfs and get the location of the file
    const ipfsHelper = new IpfsHelper();
    const hash = await ipfsHelper.addFile(file);

    // store the hash on the tangle
    const now = new Date();

    const date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    const message = {
        "filename": "sample.txt",
        "date": `Date: ${date}, time: ${time} `,
        "hash": hash
    };

    const mamHelper = new MamHelper();
    await mamHelper.create(message);

}

main()