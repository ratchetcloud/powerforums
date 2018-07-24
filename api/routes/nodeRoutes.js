const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const loadNodeWithPermssion = require('../middleware/loadNodeWithPermssion');

// Import controllers.
const NodeController = require('../controllers/nodeController');

// Create a new node. Node can be a Forum, a Topic or a Reply.
router.post("/",
    checkAuth,
    loadNodeWithPermssion,
    NodeController.node_create
);

// Get a node by ID.
router.get('/:nodeId([a-fA-F0-9]{24})',
    loadNodeWithPermssion,
    NodeController.node_getById
);

// Update a node.
router.put('/:nodeId([a-fA-F0-9]{24})',
    checkAuth,
    loadNodeWithPermssion,
    NodeController.node_update
);

// Delete a node.
router.delete('/:nodeId([a-fA-F0-9]{24})',
    checkAuth,
    loadNodeWithPermssion,
    NodeController.node_delete
);

// Get children of a given node, with paginated information.
router.post('/getPaginatedChildren',
    NodeController.node_getPaginatedChildren
);

module.exports = router;