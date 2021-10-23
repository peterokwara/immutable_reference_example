import { IMamChannelState } from "@iota/mam.js";
import { createChannel, createMessage, mamAttach, TrytesHelper } from "@iota/mam.js";
import crypto from "crypto";
import fs from "fs";
import config from "../data/config.local.json";
import { INodeConfiguration } from "../models/configuration/INodeConfiguration";

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
     * @returns The mam channel state
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
            channelState = createChannel(this.generateSeed(81), 2, "public");
        }

        return channelState;

    }

    /**
     * Function to store the current channel state
     * @param channelState the channel state
     */
    public async storeChannelState(channelState: IMamChannelState): Promise<void> {
        // Store the channel state.
        try {
            fs.writeFileSync("./channelState.json", JSON.stringify(channelState, undefined, "\t"));
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Function to generate a seed
     * @param length the length of the seed
     * @returns the seed itself
     */
    public generateSeed(length: number): string {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
        let seed = "";
        while (seed.length < length) {
            const byte = crypto.randomBytes(1);
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
            console.log("Attaching to tangle, please wait...");
            const { messageId } = await mamAttach(this._nodeConfig.provider, mamMessage);
            console.log(`Message Id`, messageId);
            console.log(`You can view the mam channel here https://explorer.iota.org/mainnet/streams/0/${mamMessage.root}/public/`);

            // store the state
            await this.storeChannelState(channelState);

        } catch (error) {
            throw new Error(`Could not store the message on the mam channel ${error} `);
        }

    }
}
