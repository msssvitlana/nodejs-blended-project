import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      convert: false,
      abortEarly: false,
    });
    next();
  } catch (err) {
    throw createHttpError(400, 'Bad request!', { errors: err.details });
  }
};
