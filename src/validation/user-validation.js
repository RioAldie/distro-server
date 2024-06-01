import Joi from 'joi';

const userValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  email: Joi.string().max(100),
});

export { userValidation };
