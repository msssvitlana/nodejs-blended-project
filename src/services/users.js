import createHttpError from 'http-errors';
import { UserModel } from '../db/models/user.js';
import bcrypt from 'bcrypt';

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
