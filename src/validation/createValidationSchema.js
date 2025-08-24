import Joi from 'joi';

export const createValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string()
    .required()
    .valid('books', 'electronics', 'clothing', 'other'),
  description: Joi.string(),
});
