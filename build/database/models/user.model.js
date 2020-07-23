"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    local: {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    avatar: { type: String, default: '/images/default-profile.svg' },
    following: { type: [Schema.Types.ObjectId], ref: 'user' },
});
userSchema.statics.hashPassword = (password) => {
    return bcrypt_1.default.hash(password, 12);
};
userSchema.methods.comparePassword = function (password) {
    return bcrypt_1.default.compare(password, this.local.password);
};
exports.User = mongoose_1.default.model('user', userSchema);
