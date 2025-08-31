import Joi from 'joi';
import { objectIdValidation } from './helpers.js';

export const patchValidationSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  category: Joi.string().valid('books', 'electronics', 'clothing', 'other'),
  description: Joi.string(),
  userId: objectIdValidation(),
});

export const createValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string()
    .required()
    .valid('books', 'electronics', 'clothing', 'other'),
  description: Joi.string(),
  userId: objectIdValidation(),
});
