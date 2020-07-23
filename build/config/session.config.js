"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const MongoStore = connect_mongo_1.default(express_session_1.default);
app_1.app.use(express_session_1.default({
    secret: 'je suis un secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    store: new MongoStore({
        mongooseConnection: mongoose_1.default.connection,
        ttl: 60 * 60 * 24 * 14,
    }),
}));
