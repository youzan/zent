const express = require('express');

const router = express.Router();
router.use('/shop', require('./shop'));
router.use('/order', require('./order'));

module.exports = router;
