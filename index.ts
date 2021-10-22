// import { MamHelper } from "./utils/mamHelper";
import { FileHelper } from "./utils/fileHelper";
import { IpfsHelper } from "./utils/ipfsHelper";

// async function transaction() {
//     // send the transaction to the mam channel
//     const mamHelper = new MamHelper();
//     const transaction = {
//         "message": "discothequee"
//     };
//     // send the transaction and event
//     await mamHelper.create(transaction);
// }

// transaction();

async function ipfsTest() {

    const ipfsHelper = new IpfsHelper();
    const fileHelper = new FileHelper();
    const file = fileHelper.fetchFile();
    await ipfsHelper.addFile(file);
}

ipfsTest()