import { Router } from 'express';

import { ensureAuthenticated } from '../config/guards.config';
import {
  signup,
  signupForm,
  uploadImage,
  userProfile,
  userList,
  followUser,
  unFollowUser,
} from '../controllers/users.controller';

const router = Router();

router.get('/', userList);
router.get('/follow/:userId', followUser);
router.get('/unfollow/:userId', unFollowUser);
router.get('/:username', userProfile);
router.get('/signup/form', signupForm);
router.post('/signup', signup);
router.post('/update/image', ensureAuthenticated, uploadImage);

export default router;
