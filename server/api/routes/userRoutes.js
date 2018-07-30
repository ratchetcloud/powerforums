const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

// Import controllers.
const UserController = require('../controllers/userController');

/**
 * Create a new User.
 */
router.put('/', checkAuth, UserController.user_create);

/**
 * Get users.
 */
router.post('/getPaginated', checkAuth, UserController.user_getPaginated);

router.get('/:userId([a-fA-F0-9]{24})?', checkAuth, UserController.user_getById);

/**
 * Delete an User.
 */
router.delete('/:userId([a-fA-F0-9]{24})?', checkAuth, UserController.user_delete);

/**
 * Authenticate an User.
 */
router.post('/login', UserController.user_login);

/**
 * Signup User.
 */
router.put('/signup', UserController.user_signup)

module.exports = router;