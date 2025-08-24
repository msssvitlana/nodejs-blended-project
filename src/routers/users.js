import { Router } from 'express';
import { registerUserController } from '../controllers/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createUserValidationSchema } from '../validation/users.js';

const usersRouter = Router();

usersRouter.post(
  '/register',
  validateBody(createUserValidationSchema),
  registerUserController,
);

export default usersRouter;
