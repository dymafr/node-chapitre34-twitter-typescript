import { Document } from 'mongoose';

export interface ITweet extends Document {
  content: string;
  author: string;
}
