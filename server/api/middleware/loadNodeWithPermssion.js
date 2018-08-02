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

const checkPermission = require("./checkPermission")

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

module.exports = (req, res, next) => {
    let user = null;
    if (res.locals.userData)
        user = res.locals.userData;

    load(req)
        .then((node) => {
            if (checkPermission(req.method, node, user)) {
                req.node = node;
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