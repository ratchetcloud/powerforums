const User = require("../models/userModel");
const Role = require("../models/roleModel");
const Node = require("../models/nodeModel");


function isAdmin(node) {
    // TODO: check current user is admin for this scope
    return false;
}

const canDoWithNode = (actionType, user, node, nodeAuthor) => {
    switch (actionType) {
        case 'CREATE':
            if (node.type === 'Forum') {
                // Only Admin can create Forum
                if (isAdmin(node))
                    return true;

            }else if (node.type === 'Topic' || node.type === 'Reply') {
                // Everyone can create Topic or Reply
                return true;
            }
            break;

        case 'UPDATE':
            // Only owner of node can update.
            if (nodeAuthor.equals(user._id)) // cause mongoose.ObjectId
                return true;
            break;

        case 'DELETE':
            // Owner or admin can delete
            if (nodeAuthor.equals(user._id) || isAdmin(node))
                return true;
            break;
    }

    // Otherwise, no permission
    return false;
};


module.exports = (modelType, actionType) => (req, res, next) => {
    const user = new User(res.locals.userData);

    switch (modelType) {
        case Node:
            if (canDoWithNode(actionType, user, req.node, req.nodeAuthor)) {
                next();
                return;
            }
            break;

        case User:
            // TODO
            break;

        case Role:
            // TODO
            break;
    }
    return res.status(403).json({ message: 'Forbidden' });
}