const express = require('express');
const validateJWT = require('../../middlewares/validateJWT');

const router = express.Router();

router.post('/', require('./create'));
router.post('/admin', validateJWT, require('./createAdmin'));

module.exports = router;
