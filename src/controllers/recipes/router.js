const express = require('express');

const validateJWT = require('../../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, require('./create'));
router.get('/', require('./list'));

module.exports = router;