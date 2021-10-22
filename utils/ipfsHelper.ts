const ipfs = require('ipfs-core')
const fs = require('fs');

export class IpfsHelper {
    public async addFile() {
        const node = await ipfs.create();
        const version = await node.version();
        console.log(`Version: ${version.version}`)
    }
}