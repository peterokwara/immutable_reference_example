import * as ipfs from "ipfs-core";

/**
 * Class to handle interactions with ipfs
 */
export class IpfsHelper {
    /**
     * Function to upload a file to ipfs
     * @param file the file to be uploaded
     * @returns the file location in ipfs
     */
    public async addFile(file: Buffer): Promise<String> {

        const node = await ipfs.create();
        const version = await node.version();

        console.log("Version:", version.version);

        // Upload the file
        const uploadedFile = await node.add(file, { pin: true });
        console.log(`Added file content ${uploadedFile.path}`);
        console.log(`Your file can be found here: https://cloudflare-ipfs.com/ipfs/${uploadedFile.path}`);

        return uploadedFile.path;
    }
}
