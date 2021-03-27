"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTweetsFormAuthorId = exports.getCurrentUserTweetsWithFollowing = exports.updateTweet = exports.getTweet = exports.deleteTweet = exports.createTweet = exports.getTweets = void 0;
const tweet_model_1 = require("../database/models/tweet.model");
const getTweets = () => {
    return tweet_model_1.Tweet.find({}).exec();
};
exports.getTweets = getTweets;
const createTweet = (tweet) => {
    const newTweet = new tweet_model_1.Tweet(tweet);
    return newTweet.save();
};
exports.createTweet = createTweet;
const deleteTweet = (tweetId) => {
    return tweet_model_1.Tweet.findByIdAndDelete(tweetId).exec();
};
exports.deleteTweet = deleteTweet;
const getTweet = (tweetId) => {
    return tweet_model_1.Tweet.findOne({ _id: tweetId }).exec();
};
exports.getTweet = getTweet;
const updateTweet = (tweetId, tweet) => {
    return tweet_model_1.Tweet.findByIdAndUpdate(tweetId, { $set: tweet }, { runValidators: true });
};
exports.updateTweet = updateTweet;
const getCurrentUserTweetsWithFollowing = (user) => {
    if (user.following) {
        return tweet_model_1.Tweet.find({ author: { $in: [...user.following, user._id] } })
            .populate('author')
            .exec();
    }
    else {
        return null;
    }
};
exports.getCurrentUserTweetsWithFollowing = getCurrentUserTweetsWithFollowing;
const getUserTweetsFormAuthorId = (authorId) => {
    return tweet_model_1.Tweet.find({ author: authorId }).populate('author').exec();
};
exports.getUserTweetsFormAuthorId = getUserTweetsFormAuthorId;
