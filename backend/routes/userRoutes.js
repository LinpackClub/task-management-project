const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const requireAuth = require('../middlewares/requireAuth');

router.get('/', requireAuth, userController.getAllUsers);
router.get('/me', requireAuth, userController.getMe);

module.exports = router;