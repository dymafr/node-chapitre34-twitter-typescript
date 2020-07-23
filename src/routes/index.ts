import { Router, Response } from 'express';

import { ensureAuthenticated } from '../config/guards.config';
import tweets from './tweets.routes';
import users from './users.routes';
import auth from './auth.routes';

const router = Router();
router.use('/tweets', ensureAuthenticated, tweets);
router.use('/users', users);
router.use('/auth', auth);

router.get('/', (_, res: Response) => {
  res.redirect('/tweets');
});

export default router;
