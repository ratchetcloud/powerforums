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

const errorNotFound = { message: "No valid node found for provided ID", code: 404 }
const errorObjectId = { message: "Provided ObjectId is not valid.", code : 400 };
const errorInvalidType = { message: "Provided action type is not valid", code: 500 };
const errorParentNodeNotFound = { message: "Parent node not found.", code: 404 };

/**
 * Load node data from `req`
 * @param req: Express req param
 * @returns Promise resolves (node, nodeAuthor) or rejects (err, code)
 */
function load(req) {
    return new Promise(function (resolve, reject) {
        switch (req.method) {
            case 'POST':
                if (!req.body.parentId) {
                    // If parent node were not found, return a 404 error.
                    reject(errorParentNodeNotFound);
                }
                /**
                 *  There is no instance in db, so use data in req.body
                 *  add ancestorList to req.body
                 */ 
                Node.findById(req.body.parentId)
                    .exec()
                    .then(parentNode => {
                        req.body.ancestorList = parentNode.ancestorList.concat({_id: parentNode._id, title: 'title' in parentNode ? parentNode.title : ''});
                        resolve(req.body);
                    })
                    .catch(error => {
                        reject(error);
                    });

                break;

            case 'GET':
            case 'PUT':
            case 'PATCH':
            case 'DELETE':
                // Load instance in db
                let nodeId = req.params.nodeId;
                if (!ObjectId.isValid(nodeId)) {
                    // If nodeId is not valid, return a 400 error.
                    reject(errorObjectId);
                    return;
                }

                Node.findById(nodeId)
                    .exec()
                    .then(document => {
                        if (!document) {
                            reject(errorNotFound);
                            return;
                        }
                        resolve(document);
                    })
                    .catch(error => {
                        reject(error);
                    });
                break;

            default:
                reject(errorInvalidType);
        }
    });
}

function checkPermission (req, user) {
    let permissionList = new Set();

    if (!user) {
        // If guest, add guest filter
        permissionList.add('defaultGuest')
    } else {
        // Signuped user who has special permissions
        if (user.permissions.length > 0) {
            let ancestorIds = req.node.ancestorList.map(ancestor => ancestor._id);
            
            // Concat permission which have permissions about req.node
            for (let permissionObject of user.permissions) {
                // Check permission of upper node
                if (Object.values(ancestorIds).some(ancestorId => ancestorId.equals(permissionObject._nodeId))) {
                    // If have permission, add the permission to permissionList
                    USER_GROUPS.forEach(userGroup => {
                        if (userGroup._id.equals(permissionObject._userGroupId)) {
                            userGroup.permissions.forEach(p => permissionList.add(p));
                        }
                    })
                }
            }
        }

        // Add default signupedUser rule
        permissionList.add('defaultSignupedUser')
    }

    // Check permission rules
    for (permission of permissionList) {
        let filter = require('../../permissionRules/' + permission);
        if(filter(req, user)) {
            return true;
        }
    } 
    return false;
}


module.exports = (req, res, next) => {
    let user = null;
    if (res.locals.userData)
        user = res.locals.userData;

    load(req)
        .then((node) => {
            req.node = node;
            if (checkPermission(req, user)) {
                next();
            } else
                res.status(403).json({ message: 'Forbidden' });
        })
        .catch((err) => {
            console.log(err)
            if (err.code) {
                res.status(err.code).json(err);
            } else {
                res.status(500).json(err);
            }  
        })
};