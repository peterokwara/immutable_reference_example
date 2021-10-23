"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MamHelper = void 0;
const mam_js_1 = require("@iota/mam.js");
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const config_local_json_1 = __importDefault(require("../data/config.local.json"));
/**
 * Class to handle the storage of information on the mam channel
 */
class MamHelper {
    constructor() {
        this._nodeConfig = config_local_json_1.default.node;
    }
    /**
     * Function to create a new channel if one does not exist
     * @returns The mam channel state
     */
    async createNewChannel() {
        let channelState;
        try {
            const currentState = fs_1.default.readFileSync("./channelState.json");
            if (currentState) {
                channelState = JSON.parse(currentState.toString());
            }
        }
        catch (error) { }
        // If we couldn't load the details then create a new channel.
        if (!channelState) {
            // create a new mam channel
            channelState = (0, mam_js_1.createChannel)(this.generateSeed(81), 2, "public");
        }
        return channelState;
    }
    /**
     * Function to store the current channel state
     * @param channelState the channel state
     */
    async storeChannelState(channelState) {
        // Store the channel state.
        try {
            fs_1.default.writeFileSync("./channelState.json", JSON.stringify(channelState, undefined, "\t"));
        }
        catch (e) {
            console.error(e);
        }
    }
    /**
     * Function to generate a seed
     * @param length the length of the seed
     * @returns the seed itself
     */
    generateSeed(length) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
        let seed = "";
        while (seed.length < length) {
            const byte = crypto_1.default.randomBytes(1);
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
    async create(asciiMessage) {
        try {
            const channelState = await this.createNewChannel();
            // Create a MAM message using the channel state.
            const mamMessage = (0, mam_js_1.createMessage)(channelState, mam_js_1.TrytesHelper.fromAscii(JSON.stringify(asciiMessage)));
            // Display the details for the MAM message.
            console.log("Seed:", channelState.seed);
            console.log("Address:", mamMessage.address);
            console.log("Root:", mamMessage.root);
            console.log("NextRoot:", channelState.nextRoot);
            // Attach the message.
            console.log("Attaching to tangle, please wait...");
            const { messageId } = await (0, mam_js_1.mamAttach)(this._nodeConfig.provider, mamMessage);
            console.log(`Message Id`, messageId);
            console.log(`You can view the mam channel here https://explorer.iota.org/mainnet/streams/0/${mamMessage.root}/public/`);
        }
        catch (error) {
            throw new Error(`Could not store the message on the mam channel ${error} `);
        }
    }
}
exports.MamHelper = MamHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFtSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXRpbHMvbWFtSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHlDQUFxRjtBQUNyRixvREFBNEI7QUFDNUIsNENBQW9CO0FBQ3BCLGtGQUErQztBQUcvQzs7R0FFRztBQUNILE1BQWEsU0FBUztJQU9sQjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsMkJBQU0sQ0FBQyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxnQkFBZ0I7UUFDekIsSUFBSSxZQUE4QixDQUFDO1FBRW5DLElBQUk7WUFDQSxNQUFNLFlBQVksR0FBRyxZQUFFLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDNUQsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDdEQ7U0FFSjtRQUFDLE9BQU8sS0FBSyxFQUFFLEdBQUc7UUFFbkIsNkRBQTZEO1FBQzdELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFFZiwyQkFBMkI7WUFDM0IsWUFBWSxHQUFHLElBQUEsc0JBQWEsRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNwRTtRQUVELE9BQU8sWUFBWSxDQUFDO0lBRXhCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsWUFBOEI7UUFDekQsMkJBQTJCO1FBQzNCLElBQUk7WUFDQSxZQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzFGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxZQUFZLENBQUMsTUFBYztRQUM5QixNQUFNLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQztRQUM5QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO1lBQ3pCLE1BQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRTtnQkFDZixJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDeEM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQW9CO1FBQ3BDLElBQUk7WUFFQSxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBRW5ELGdEQUFnRDtZQUNoRCxNQUFNLFVBQVUsR0FBRyxJQUFBLHNCQUFhLEVBQUMsWUFBWSxFQUFFLHFCQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXJHLDJDQUEyQztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFaEQsc0JBQXNCO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUNuRCxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsTUFBTSxJQUFBLGtCQUFTLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDN0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpRkFBaUYsVUFBVSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUM7U0FDM0g7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELEtBQUssR0FBRyxDQUFDLENBQUM7U0FDL0U7SUFFTCxDQUFDO0NBQ0o7QUEvRkQsOEJBK0ZDIn0=