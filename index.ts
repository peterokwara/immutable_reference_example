// import { MamHelper } from "./utils/mamHelper";
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
    await ipfsHelper.addFile()
}

ipfsTest()