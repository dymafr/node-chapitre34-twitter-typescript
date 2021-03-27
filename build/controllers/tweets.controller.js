"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweetUpdate = exports.tweetEdit = exports.tweetDelete = exports.tweetCreate = exports.tweetNew = exports.tweetList = void 0;
const tweets_queries_1 = require("../queries/tweets.queries");
const tweetList = async (req, res, next) => {
    try {
        const tweets = await tweets_queries_1.getCurrentUserTweetsWithFollowing(req.user);
        res.render('tweets/tweet', {
            tweets,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
            user: req.user,
            editable: true,
        });
    }
    catch (e) {
        next(e);
    }
};
exports.tweetList = tweetList;
const tweetNew = (req, res) => {
    res.render('tweets/tweet-form', {
        tweet: {},
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
    });
};
exports.tweetNew = tweetNew;
const tweetCreate = async (req, res) => {
    try {
        const body = req.body;
        await tweets_queries_1.createTweet({ ...body, author: req.user._id });
        res.redirect('/tweets');
    }
    catch (e) {
        const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
        res.status(400).render('tweets/tweet-form', {
            errors,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
        });
    }
};
exports.tweetCreate = tweetCreate;
const tweetDelete = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        await tweets_queries_1.deleteTweet(tweetId);
        const tweets = await tweets_queries_1.getCurrentUserTweetsWithFollowing(req.user);
        res.render('tweets/tweet-list', {
            tweets,
            currentUser: req.user,
            editable: true,
        });
    }
    catch (e) {
        next(e);
    }
};
exports.tweetDelete = tweetDelete;
const tweetEdit = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        const tweet = await tweets_queries_1.getTweet(tweetId);
        res.render('tweets/tweet-form', {
            tweet,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
        });
    }
    catch (e) {
        next(e);
    }
};
exports.tweetEdit = tweetEdit;
const tweetUpdate = async (req, res) => {
    const tweetId = req.params.tweetId;
    try {
        const body = req.body;
        await tweets_queries_1.updateTweet(tweetId, body);
        res.redirect('/tweets');
    }
    catch (e) {
        const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
        const tweet = await tweets_queries_1.getTweet(tweetId);
        res.status(400).render('tweets/tweet-form', {
            errors,
            tweet,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
        });
    }
};
exports.tweetUpdate = tweetUpdate;
