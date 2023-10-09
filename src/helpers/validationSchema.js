import Joi from "joi";

const authSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

export { authSchema };
