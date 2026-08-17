import { IUser, UserForm } from '../interfaces';

import { User } from '../database/models/user.model';

export const createUser = async (user: UserForm) => {
  try {
    const hashedPassword = await User.hashPassword(user.password);
    const newUser = new User({
      username: user.username,
      local: {
        email: user.email,
        password: hashedPassword,
      },
    });
    return newUser.save();
  } catch (e) {
    throw e;
  }
};

export const findUserPerEmail = (email: string) => {
  return User.findOne({ 'local.email': email }).exec();
};

export const findUserPerId = (id: string) => {
  return User.findById(id).exec();
};

export const findUserPerUsername = (username: string) => {
  return User.findOne({ username }).exec();
};

export const searchUsersPerUsername = (search: string) => {
  // Le texte de recherche vient de l'utilisateur : il faut échapper les
  // caractères qui ont un sens dans une expression régulière. Sans cela, une
  // recherche sur « a{100000} » suffit à occuper le processeur du serveur.
  const echappe = (search ?? '').replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
  const reg = new RegExp(`^${echappe}`);
  return User.find({ username: { $regex: reg } }).exec();
};

export const addUserIdToCurrentUserFollowing = (
  currentUser: IUser,
  userId: string
) => {
  if (currentUser.following) {
    currentUser.following = [...currentUser.following, userId];
    return currentUser.save();
  }
  return;
};

export const removeUserIdToCurrentUserFollowing = (
  currentUser: IUser,
  userId: string
) => {
  if (currentUser.following) {
    currentUser.following = currentUser.following.filter(
      (objId) => objId.toString() !== userId
    );
    return currentUser.save();
  }
  return;
};
