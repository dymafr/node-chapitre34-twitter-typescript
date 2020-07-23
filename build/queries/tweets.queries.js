"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTweetsFormAuthorId = exports.getCurrentUserTweetsWithFollowing = exports.updateTweet = exports.getTweet = exports.deleteTweet = exports.createTweet = exports.getTweets = void 0;
const tweet_model_1 = require("../database/models/tweet.model");
exports.getTweets = () => {
    return tweet_model_1.Tweet.find({}).exec();
};
exports.createTweet = (tweet) => {
    const newTweet = new tweet_model_1.Tweet(tweet);
    return newTweet.save();
};
exports.deleteTweet = (tweetId) => {
    return tweet_model_1.Tweet.findByIdAndDelete(tweetId).exec();
};
exports.getTweet = (tweetId) => {
    return tweet_model_1.Tweet.findOne({ _id: tweetId }).exec();
};
exports.updateTweet = (tweetId, tweet) => {
    return tweet_model_1.Tweet.findByIdAndUpdate(tweetId, { $set: tweet }, { runValidators: true });
};
exports.getCurrentUserTweetsWithFollowing = (user) => {
    if (user.following) {
        return tweet_model_1.Tweet.find({ author: { $in: [...user.following, user._id] } })
            .populate('author')
            .exec();
    }
    else {
        return null;
    }
};
exports.getUserTweetsFormAuthorId = (authorId) => {
    return tweet_model_1.Tweet.find({ author: authorId }).populate('author').exec();
};
