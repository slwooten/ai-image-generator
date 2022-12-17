const express = require('express');
const router = express.Router();

const { generateImage } = require('../controllers/apiController');

router.post('/go', generateImage);

module.exports = router;
