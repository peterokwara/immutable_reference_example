"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MamHelper = void 0;
var config = require("../data/config.local.json");
var _a = require('@iota/mam.js'), createChannel = _a.createChannel, createMessage = _a.createMessage, mamAttach = _a.mamAttach, TrytesHelper = _a.TrytesHelper;
var fs = require('fs');
var crypto = require('crypto');
/**
 * Class to handle the storage of information on the mam channel
 */
var MamHelper = /** @class */ (function () {
    function MamHelper() {
        this._nodeConfig = config.node;
    }
    /**
     * Function to create a new channel if one does not exist
     */
    MamHelper.prototype.createNewChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var channelState, currentState;
            return __generator(this, function (_a) {
                try {
                    currentState = fs.readFileSync("./channelState.json");
                    if (currentState) {
                        channelState = JSON.parse(currentState.toString());
                    }
                }
                catch (error) { }
                // If we couldn't load the details then create a new channel.
                if (!channelState) {
                    // create a new mam channel
                    channelState = createChannel(this.generateSeed(81), 2, this._nodeConfig.mode);
                }
                return [2 /*return*/, channelState];
            });
        });
    };
    MamHelper.prototype.storeChannelState = function (channelState) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Store the channel state.
                try {
                    fs.writeFileSync('./channelState.json', JSON.stringify(channelState, undefined, "\t"));
                }
                catch (e) {
                    console.error(e);
                }
                return [2 /*return*/];
            });
        });
    };
    MamHelper.prototype.generateSeed = function (length) {
        var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
        var seed = '';
        while (seed.length < length) {
            var byte = crypto.randomBytes(1);
            if (byte[0] < 243) {
                seed += charset.charAt(byte[0] % 27);
            }
        }
        return seed;
    };
    /**
     * Function to store information on the mam channel
     * @param asciiMessage The message to be stored on the mam channel
     */
    MamHelper.prototype.create = function (asciiMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var channelState, mamMessage, messageId, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.createNewChannel()];
                    case 1:
                        channelState = _a.sent();
                        mamMessage = createMessage(channelState, TrytesHelper.fromAscii(JSON.stringify(asciiMessage)));
                        // Display the details for the MAM message.
                        console.log("Seed:", channelState.seed);
                        console.log("Address:", mamMessage.address);
                        console.log("Root:", mamMessage.root);
                        console.log("NextRoot:", channelState.nextRoot);
                        // Attach the message.
                        console.log('Attaching to tangle, please wait...');
                        return [4 /*yield*/, mamAttach(this._nodeConfig.provider, mamMessage, "MY9MAM")];
                    case 2:
                        messageId = (_a.sent()).messageId;
                        console.log("Message Id", messageId);
                        console.log("You can view the mam channel here https://explorer.iota.org/mainnet/streams/0/" + mamMessage.root + "/" + this._nodeConfig.mode + "/");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Could not store the message on the mam channel " + error_1 + " ");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MamHelper;
}());
exports.MamHelper = MamHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFtSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXRpbHMvbWFtSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQzlDLElBQUEsS0FBNEQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFqRixhQUFhLG1CQUFBLEVBQUUsYUFBYSxtQkFBQSxFQUFFLFNBQVMsZUFBQSxFQUFFLFlBQVksa0JBQTRCLENBQUM7QUFDMUYsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUdqQzs7R0FFRztBQUNIO0lBT0k7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUdEOztPQUVHO0lBQ1Usb0NBQWdCLEdBQTdCOzs7O2dCQUdJLElBQUk7b0JBQ00sWUFBWSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxZQUFZLEVBQUU7d0JBQ2QsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7cUJBQ3REO2lCQUVKO2dCQUFDLE9BQU8sS0FBSyxFQUFFLEdBQUc7Z0JBRW5CLDZEQUE2RDtnQkFDN0QsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFFZiwyQkFBMkI7b0JBQzNCLFlBQVksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDakY7Z0JBRUQsc0JBQU8sWUFBWSxFQUFDOzs7S0FFdkI7SUFFWSxxQ0FBaUIsR0FBOUIsVUFBK0IsWUFBWTs7O2dCQUN2QywyQkFBMkI7Z0JBQzNCLElBQUk7b0JBQ0EsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDMUY7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDbkI7Ozs7S0FDSjtJQUVNLGdDQUFZLEdBQW5CLFVBQW9CLE1BQU07UUFDdEIsSUFBTSxPQUFPLEdBQUcsNkJBQTZCLENBQUM7UUFDOUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtZQUN6QixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2xDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRTtnQkFDZixJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDeEM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDVSwwQkFBTSxHQUFuQixVQUFvQixZQUFvQjs7Ozs7Ozt3QkFHWCxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBQTs7d0JBQTVDLFlBQVksR0FBRyxTQUE2Qjt3QkFHNUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFckcsMkNBQTJDO3dCQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBRWhELHNCQUFzQjt3QkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO3dCQUM1QixxQkFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxFQUFBOzt3QkFBOUUsU0FBUyxHQUFLLENBQUEsU0FBZ0UsQ0FBQSxVQUFyRTt3QkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUZBQWlGLFVBQVUsQ0FBQyxJQUFJLFNBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE1BQUcsQ0FBQyxDQUFDOzs7O3dCQUsxSSxNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFrRCxPQUFLLE1BQUcsQ0FBQyxDQUFDOzs7OztLQUduRjtJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQXpGRCxJQXlGQztBQXpGWSw4QkFBUyJ9