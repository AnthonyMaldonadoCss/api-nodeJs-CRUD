const express = require('express');
const router = express.Router();
const participans = require('../../controllers/participants/participants.controller');

router.post('/register', participans.register);

module.exports = router