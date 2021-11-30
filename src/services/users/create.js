const { userSchema } = require('../../commons/joiSchemas');
const users = require('../../models/document')('users');

module.exports = async (user, role) => {
  const valid = userSchema.validate(user);

  if (valid.error) {
    return { err: { code: 'invalidEntries' } };
  }

  try {
    const findUser = await users.find({ email: user.email });
    if (findUser) {
      return { err: { code: 'emailAlreadyExists' } };
    }
    const inserted = await users.insert({ ...user, role: role || 'user' });
    const { password, ...usrData } = inserted.ops[0];
    return usrData;
  } catch (e) {
    console.error(e);
  }

  return user;
};