const express = require('express');

const {
  validateJWT,
  validateUpload,
  uploadImage,
} = require('../../middlewares');

const router = express.Router();

router.post('/', validateJWT, require('./create'));
router.get('/:id', require('./get'));
router.put(
  '/:id/image',
  validateJWT,
  validateUpload,
  uploadImage('image'),
  require('./updateImage'),
);
router.put('/:id', validateJWT, require('./update'));
router.delete('/:id', validateJWT, require('./remove'));
router.get('/', require('./list'));

module.exports = router;
