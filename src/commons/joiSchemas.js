const joi = require('joi');

const userSchema = joi.object().keys({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
});

const rcpSchema = joi.object().keys({
  name: joi.string().required(),
  ingredients: joi.string().required(),
  preparation: joi.string().required(),
});

module.exports = {
  userSchema,
  rcpSchema,
};