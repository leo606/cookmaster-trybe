const { userSchema } = require('../../commons/joiSchemas');

module.exports = async (user) => {
  const valid = userSchema.validate(user);

  if (valid.error) {
    return { err: { code: 'invalid_entries' } };
  }
  return user;
};