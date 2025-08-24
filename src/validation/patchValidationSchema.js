import Joi from 'joi';

export const patchValidationSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  category: Joi.string()
  .valid('books', 'electronics', 'clothing', 'other'),
  description: Joi.string(),
});
