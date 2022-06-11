
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const {getAutismHandler, predictAutismHandler} = require('../handler/autism');

router.get('/', getAutismHandler);
router.post('/', predictAutismHandler);

module.exports = router;