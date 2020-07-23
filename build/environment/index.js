"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const development_1 = __importDefault(require("./development"));
const production_1 = __importDefault(require("./production"));
exports.default = {
    development: development_1.default,
    production: production_1.default,
};
