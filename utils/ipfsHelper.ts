const ipfs = require('ipfs-core')

export class IpfsHelper {
    public async addFile(file) {
        const node = await ipfs.create();
        const version = await node.version();
        console.log(`Version: ${version.version}`)

        const uploadedFile = await node.add(file, { pin: true })
        console.log(`Added file content ${uploadedFile.path}`)
    }
}