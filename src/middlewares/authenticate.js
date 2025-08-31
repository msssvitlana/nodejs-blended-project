// Створіть middleware authenticate, який буде на основі access токену з заголовку Authorization у вигляді Bearer-токену, визначати користувача і додавати його до обʼєкту запиту(req) у вигляді властивості user. При цьому переконайтеся, що access токен не протермінований, інакше за допомогою бібліотеки createHttpError поверніть помилку зі статусом 401 і повідомленням “Access token expired”.

import createHttpError from 'http-errors';
import { SessionModel } from '../db/models/session.js';
import { UserModel } from '../db/models/user.js';

// Застосуйте цей middleware до всіх роутів продуктів, щоб користувачі могли взаємодіяти тільки з власною колекцією продуктів.
export const authenticate = async (res, req, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please provide authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await SessionModel.findOne({ accessToken: token });
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
    return;
  }
  const user = await UserModel.findById(session.userId);
  if (!user) {
    next(createHttpError(401));
    return;
  }
  req.user = user;

  next();
};
