const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

// Import controllers.
const RoleController = require('../controllers/roleController');

// Create a new role.
router.put('/', checkAuth, RoleController.role_create);

// Retrieve existing roles.
router.post('/getPaginated', checkAuth, RoleController.role_getPaginated);

// Delete a role.
router.delete('/:roleId([a-fA-F0-9]{24})?', checkAuth, RoleController.role_delete);

module.exports = router;