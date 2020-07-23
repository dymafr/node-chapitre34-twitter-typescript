import { Tweet } from '../database/models/tweet.model';
import { ITweet, IUser } from '../interfaces';

export const getTweets = () => {
  return Tweet.find({}).exec();
};

export const createTweet = (tweet: ITweet) => {
  const newTweet = new Tweet(tweet);
  return newTweet.save();
};

export const deleteTweet = (tweetId: string) => {
  return Tweet.findByIdAndDelete(tweetId).exec();
};

export const getTweet = (tweetId: string) => {
  return Tweet.findOne({ _id: tweetId }).exec();
};

export const updateTweet = (tweetId: string, tweet: ITweet) => {
  return Tweet.findByIdAndUpdate(
    tweetId,
    { $set: tweet },
    { runValidators: true }
  );
};

export const getCurrentUserTweetsWithFollowing = (user: IUser) => {
  if (user.following) {
    return Tweet.find({ author: { $in: [...user.following, user._id] } })
      .populate('author')
      .exec();
  } else {
    return null;
  }
};

export const getUserTweetsFormAuthorId = (authorId: string) => {
  return Tweet.find({ author: authorId }).populate('author').exec();
};
