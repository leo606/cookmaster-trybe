const auth = require('./auth');
const error = require('./error');
const uploadImage = require('./uploadImage');
const validateJWT = require('./validateJWT');
const validateUpload = require('./validateUpload');

module.exports = {
  auth,
  error,
  uploadImage,
  validateJWT,
  validateUpload,
};