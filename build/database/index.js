"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = __importDefault(require("../environment"));
const env = environment_1.default[process.env.NODE_ENV];
console.log(env);
mongoose_1.default
    .connect(env.dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
})
    .then(() => console.log('connexion db ok !'))
    .catch((err) => console.log(err));
