"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileHelper_1 = require("./utils/fileHelper");
const ipfsHelper_1 = require("./utils/ipfsHelper");
const mamHelper_1 = require("./utils/mamHelper");
/**
 * Main function
 */
async function main() {
    // fetch the sample file we have
    const fileHelper = new fileHelper_1.FileHelper();
    const file = fileHelper.fetchFile();
    let hash;
    // store the file on ipfs and get the location of the file
    if (file) {
        const ipfsHelper = new ipfsHelper_1.IpfsHelper();
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
        const mamHelper = new mamHelper_1.MamHelper();
        await mamHelper.create(message);
    }
}
// tslint:disable-next-line: no-floating-promises
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxtREFBZ0Q7QUFDaEQsaURBQThDO0FBRTlDOztHQUVHO0FBQ0gsS0FBSyxVQUFVLElBQUk7SUFDZixnQ0FBZ0M7SUFDaEMsTUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7SUFDcEMsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXBDLElBQUksSUFBSSxDQUFDO0lBQ1QsMERBQTBEO0lBQzFELElBQUksSUFBSSxFQUFFO1FBQ04sTUFBTSxVQUFVLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7UUFDcEMsSUFBSSxHQUFHLE1BQU0sVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6QztJQUVELElBQUksSUFBSSxFQUFFO1FBQ04sK0JBQStCO1FBQy9CLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFFdkIsTUFBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7UUFDN0UsTUFBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO1FBRXpFLE1BQU0sT0FBTyxHQUFHO1lBQ1osUUFBUSxFQUFFLFlBQVk7WUFDdEIsSUFBSSxFQUFFLFNBQVMsSUFBSSxXQUFXLElBQUksR0FBRztZQUNyQyxJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFFRixNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUNsQyxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDbkM7QUFFTCxDQUFDO0FBRUQsaURBQWlEO0FBQ2pELElBQUksRUFBRSxDQUFDIn0=