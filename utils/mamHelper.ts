import { IMamChannelState } from "@iota/mam.js";
import { INodeConfiguration } from "../models/configuration/INodeConfiguration";
const config = require("../data/config.local.json");
const { createChannel, createMessage, mamAttach, TrytesHelper } = require('@iota/mam.js');
const fs = require('fs');
const crypto = require('crypto');


/**
 * Class to handle the storage of information on the mam channel
 */
export class MamHelper {

    /**
     * Node configuratin settings
     */
    private readonly _nodeConfig: INodeConfiguration;

    constructor() {
        this._nodeConfig = config.node;
    }


    /**
     * Function to create a new channel if one does not exist
     */
    public async createNewChannel(): Promise<IMamChannelState> {
        let channelState: IMamChannelState;

        try {
            const currentState = fs.readFileSync("./channelState.json");
            if (currentState) {
                channelState = JSON.parse(currentState.toString());
            }

        } catch (error) { }

        // If we couldn't load the details then create a new channel.
        if (!channelState) {

            // create a new mam channel
            channelState = createChannel(this.generateSeed(81), 2, this._nodeConfig.mode);
        }

        return channelState;

    }

    public async storeChannelState(channelState) {
        // Store the channel state.
        try {
            fs.writeFileSync('./channelState.json', JSON.stringify(channelState, undefined, "\t"));
        } catch (e) {
            console.error(e)
        }
    }

    public generateSeed(length) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
        let seed = '';
        while (seed.length < length) {
            const byte = crypto.randomBytes(1)
            if (byte[0] < 243) {
                seed += charset.charAt(byte[0] % 27);
            }
        }
        return seed;
    }

    /**
     * Function to store information on the mam channel
     * @param asciiMessage The message to be stored on the mam channel
     */
    public async create(asciiMessage: object): Promise<void> {
        try {

            const channelState = await this.createNewChannel();

            // Create a MAM message using the channel state.
            const mamMessage = createMessage(channelState, TrytesHelper.fromAscii(JSON.stringify(asciiMessage)));

            // Display the details for the MAM message.
            console.log("Seed:", channelState.seed);
            console.log("Address:", mamMessage.address);
            console.log("Root:", mamMessage.root);
            console.log("NextRoot:", channelState.nextRoot);

            // Attach the message.
            console.log('Attaching to tangle, please wait...')
            const { messageId } = await mamAttach(this._nodeConfig.provider, mamMessage, "MY9MAM");
            console.log(`Message Id`, messageId);
            console.log(`You can view the mam channel here https://explorer.iota.org/mainnet/streams/0/${mamMessage.root}/${this._nodeConfig.mode}/`);



        } catch (error) {
            throw new Error(`Could not store the message on the mam channel ${error} `);
        }

    }
}