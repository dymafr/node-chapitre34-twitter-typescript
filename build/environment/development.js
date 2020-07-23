"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = {
    dbUrl: 'mongodb+srv://alex:qwe@cluster0-l4izx.gcp.mongodb.net/twitter?retryWrites=true',
    cert: path_1.default.join(__dirname, '../../ssl/local.crt'),
    key: path_1.default.join(__dirname, '../../ssl/local.key'),
    portHttp: 3000,
    portHttps: 3001,
};
