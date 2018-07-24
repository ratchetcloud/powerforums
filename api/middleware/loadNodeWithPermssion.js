/**
 * Before running nodeController, job for loading `node` is executed firstly.
 * Permission checking is also executed simultaneously by request METHOD (GET/POST/PUT/DELETE).
 *
 * So the nodeController can assume that user has permission to "act" with that node,
 * with using this middleware.
 */

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Node = require("../models/nodeModel");
const User = require("../models/userModel");

const errorNotFound = { message: "No valid node found for provided ID" }
const errorObjectId = { message: "Provided ObjectId is not valid." };
const errorInvalidType = { message: "Provided action type is not valid" };


/**
 * Load node data from `req`
 * @param req: Express req param
 * @returns Promise resolves (node, nodeAuthor) or rejects (err, code)
 */
function load(req) {
    return new Promise(function (resolve, reject) {
        switch (req.method) {
            case 'POST':
                // There is no instance in db, so use data in req.body
                resolve(req.body, false);
                break;

            case 'GET':
            case 'PUT':
            case 'DELETE':
                // Load instance in db
                let nodeId = req.params.nodeId;
                if (!ObjectId.isValid(nodeId)) {
                    // If nodeId is not valid, return a 400 error.
                    reject(errorObjectId, 400);
                    return;
                }

                Node.findById(nodeId)
                    .exec()
                    .then(document => {
                        if (!document) {
                            reject(errorNotFound, 404);
                            return;
                        }
                        resolve(document);
                    })
                    .catch(error => {
                        reject(error, 404);
                    });
                break;

            default:
                reject(errorInvalidType, 500);
        }
    });
}

function isAdmin(user, node) {
    // TODO: check current user is admin for this scope
    // Temporally put `isAdmin` property to distinguish admin
    if (user.isAdmin)
        return true;
    return false;
}

/**
 * Check permission for CRUD Node
 * @param method: GET, POST, PUT, or DELETE
 * @param node: models.nodeModel
 * @param user: Current logged-in user's ID (mongoose.Types.ObjectId)
 * @returns {boolean} True if allowed, false otherwise
 */
const checkPermission = (method, node, user) => {
    switch (method) {
        case 'GET':
            // Everyone can read all nodes
            return true;

        case 'POST':
            if (node.type === 'Forum') {
                // Only Admin can create Forum
                if (isAdmin(user, node))
                    return true;

            }else if (node.type === 'Topic' || node.type === 'Reply') {
                // Everyone can create Topic or Reply
                return true;
            }
            break;

        case 'PUT':
            // Only owner of node can update.
            if (user && user._id.equals(node.authorInformation._id)) // cause mongoose.ObjectId
                return true;
            break;

        case 'DELETE':
            // Owner or admin can delete
            if (user && (user._id.equals(node.authorInformation._id) || isAdmin(user, node)))
                return true;
            break;
    }

    // Otherwise, no permission
    return false;
};

module.exports = (req, res, next) => {
    let user = null;
    if (res.locals.userData)
        user = new User(res.locals.userData);

    load(req)
        .then((node) => {
            if (checkPermission(req.method, node, user)) {
                req.node = node;
                next();
            }else
                res.status(403).json({ message: 'Forbidden' });
        })
        .catch((err, code=500) => {
            console.log(err);
            res.status(code).json(err);
        })
};