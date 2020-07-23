import { Router } from 'express';
import { signinForm, signin, signout } from '../controllers/auth.controller';

const router = Router();

router.get('/signin/form', signinForm);
router.post('/signin', signin);
router.get('/signout', signout);

export default router;
