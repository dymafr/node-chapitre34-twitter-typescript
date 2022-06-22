import {
  createTweet,
  deleteTweet,
  getTweet,
  updateTweet,
  getCurrentUserTweetsWithFollowing,
} from '../queries/tweets.queries';
import { Request, Response, NextFunction } from 'express';

export const tweetList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweets = await getCurrentUserTweetsWithFollowing(req.user!);
    res.render('tweets/tweet', {
      tweets,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
      user: req.user,
      editable: true,
    });
  } catch (e) {
    next(e);
  }
};

export const tweetNew = (req: Request, res: Response) => {
  res.render('tweets/tweet-form', {
    tweet: {},
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
};

export const tweetCreate = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    await createTweet({ ...body, author: req.user!._id });
    res.redirect('/tweets');
  } catch (e: any) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    res.status(400).render('tweets/tweet-form', {
      errors,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};

export const tweetDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweetId = req.params.tweetId;
    await deleteTweet(tweetId);
    const tweets = await getCurrentUserTweetsWithFollowing(req.user!);
    res.render('tweets/tweet-list', {
      tweets,
      currentUser: req.user,
      editable: true,
    });
  } catch (e) {
    next(e);
  }
};

export const tweetEdit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweetId = req.params.tweetId;
    const tweet = await getTweet(tweetId);
    res.render('tweets/tweet-form', {
      tweet,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  } catch (e) {
    next(e);
  }
};

export const tweetUpdate = async (req: Request, res: Response) => {
  const tweetId = req.params.tweetId;
  try {
    const body = req.body;
    await updateTweet(tweetId, body);
    res.redirect('/tweets');
  } catch (e: any) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    const tweet = await getTweet(tweetId);
    res.status(400).render('tweets/tweet-form', {
      errors,
      tweet,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};
