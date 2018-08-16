const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

// Import controllers.
const UserController = require('../controllers/userController');

// [Notice] make codes related to user management as annotation 
//          because it is not fully implemented and there is no test code.
//          in userRoutes, /login and /signup are impelemented and have test codes.

// /**
//  * Create a new User.
//  */
// router.put('/', checkAuth, UserController.user_create);

// /**
//  * Get users.
//  */
// router.post('/getPaginated', checkAuth, UserController.user_getPaginated);

// router.get('/:userId([a-fA-F0-9]{24})?', checkAuth, UserController.user_getById);

// /**
//  * Delete an User.
//  */
// router.delete('/:userId([a-fA-F0-9]{24})?', checkAuth, UserController.user_delete);

/**
 * Authenticate an User.
 */
router.post('/login', UserController.user_login);

/**
 * Sign up User.
 */
router.put('/signup', UserController.user_signUp)

module.exports = router;