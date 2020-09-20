const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user')
router.post('/signup', UserController.user_sign_up)

router.post('/login', UserController.user_login)

router.delete('/:userId', UserController.user_delete)
module.exports = router;