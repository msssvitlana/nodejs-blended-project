import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const objectIdValidation = () =>
  Joi.string().custom((value, helpers) => {
    const isValidId = isValidObjectId(value);

    if (!isValidId) return helpers.message('Not valid objectId');

    return value;
  });
