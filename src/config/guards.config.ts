import { NextFunction, Request, Response } from 'express';

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth/signin/form');
  }
};
