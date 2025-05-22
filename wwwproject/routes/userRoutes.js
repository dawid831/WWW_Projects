const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', authenticate, authorize(['admin']), userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);

router.patch('/:id', authenticate, authorize(['admin']), userController.updateUser);

module.exports = router;