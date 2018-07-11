const jwt = require('jsonwebtoken');
const CanCan = require('cancan');
const User = require("../models/userModel");
const Role = require("../models/roleModel");
const Node = require("../models/nodeModel");

module.exports = (req, res, next) => {
    const cancan = new CanCan();
    const { allow, can } = cancan;

    /*
    res.locals.userData.forEach(permission => {
        Role.findOne({ _id: permission._id })
            .exec()
            .then(role => {

            })
            .catch(err => {

            });
    });
    */

    var computedPermissions = {};

    // Get local user.
    const user = new User(res.locals.userData);
    console.log("user", user);


    if (req.body.parentId !== undefined) {
        // node_create, getPaginatedChildren
        var refPermsNodeId = req.body.parentId;

    } else if (req.params.nodeId !== undefined) {
        // node_delete, getById
        var refPermsNodeId = req.body.parentId;

    } else if (req.body._id !== undefined) {
        // node_update
        var refPermsNodeId = req.body.parentId;

    } else {
        // ?
        var refPermsNodeId = 0;
    }



    const node = new Node({ _id: refPermsNodeId });

    allow(User, 'create', Node, (user, node) => user._id === node.authorinformation._id);

    // console.log(can(user, 'view', product))
    // => true

    // console.log(can(user, 'edit', product));
    // => false

    next();
}