"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const tweetSchema = new Schema({
    content: {
        type: String,
        maxlength: [140, 'Tweet trop long'],
        minlength: [1, 'Tweet trop court'],
        required: [true, 'Champ requis'],
    },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});
exports.Tweet = mongoose_1.default.model('tweet', tweetSchema);
