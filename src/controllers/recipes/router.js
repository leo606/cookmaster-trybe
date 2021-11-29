const express = require('express');

const validateJWT = require('../../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, require('./create'));

module.exports = router;