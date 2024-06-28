import Joi from 'joi';

export const loginSchemas = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(4).required(),
});