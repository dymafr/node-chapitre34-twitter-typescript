import mongoose, { Model } from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';
import { IUser } from '../../interfaces';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  avatar: { type: String, default: '/images/default-profile.svg' },
  following: { type: [Schema.Types.ObjectId], ref: 'user' },
});

userSchema.statics.hashPassword = (password: string) => {
  return bcrypt.hash(password, 12);
};

userSchema.methods.comparePassword = (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};

interface IUserModel extends Model<IUser> {
  // bcrypt.hash rend une promesse : annoncer une chaîne ferait passer le
  // compilateur à côté de l'oubli d'un await à l'appel.
  hashPassword: (password: string) => Promise<string>;
}

export const User = mongoose.model<IUser, IUserModel>('user', userSchema);
