import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createUserValidationSchema,
  loginUserSchema,
} from '../validation/users.js';

const usersRouter = Router();

usersRouter.post(
  '/register',
  validateBody(createUserValidationSchema),
  registerUserController,
);

usersRouter.post('/login', validateBody(loginUserSchema), loginUserController);

usersRouter.post('/logout', logoutUserController);
usersRouter.post('/refresh', validateBody(refreshUserSessionController));

export default usersRouter;
