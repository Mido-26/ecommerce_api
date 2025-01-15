const express = require('express');
const router = express.Router();
const {loginUser, logoutUser, getCurrentUser } = require('../controllers/sessionController');

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', getCurrentUser);

module.exports = router;