const express = require('express');
const router = express.Router();
const controller = require('../controller/index__controller.js');

router.get('/', controller);

module.exports = router;