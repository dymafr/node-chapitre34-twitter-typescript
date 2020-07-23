import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  content: {
    type: String,
    maxlength: [140, 'Tweet trop long'],
    minlength: [1, 'Tweet trop court'],
    required: [true, 'Champ requis'],
  },
  author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

export const Tweet = mongoose.model('tweet', tweetSchema);
