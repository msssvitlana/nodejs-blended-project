import createHttpError from 'http-errors';
import { UserModel } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionModel } from '../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { randomBytes } from 'crypto';

export const registerUser = async (payload) => {
  const existingUser = await UserModel.findOne({ email: payload.email });
  if (existingUser) throw createHttpError(409, 'Email in use!');

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await UserModel.create({
    ...payload,
    password: hashedPassword,
  });

  return newUser;
};

export const loginUser = async (payload) => {
  const existingUser = await UserModel.findOne({ email: payload.email });

  if (!existingUser) {
    throw createHttpError(401, 'Email or Password is wrong');
  }

  const isEqual = await bcrypt.compare(payload.password, existingUser.password);

  if (!isEqual) {
    throw createHttpError(401, 'Email or Password is wrong');
  }

  await SessionModel.deleteOne({ userId: existingUser._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionModel.create({
    accessToken,
    refreshToken,
    userId: existingUser._id,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};
