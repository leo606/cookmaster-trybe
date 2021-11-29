const express = require('express');

const validateJWT = require('../../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, require('./create'));
router.get('/:id', require('./get'));
router.get('/', require('./list'));

module.exports = router;