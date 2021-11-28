const joi = require('joi');

const userSchema = joi.object().keys({
  name: joi.string().alphanum().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
});

module.exports = {
  userSchema,
};