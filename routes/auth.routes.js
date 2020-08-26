const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/auth.controllers');

router.post('/auth/login',AuthControllers.login);
router.post('/auth/register',AuthControllers.register);
router.delete('/auth/logout',AuthControllers.logout);
router.get('/auth/refresh-token',AuthControllers.refreshToken);

module.exports = router;