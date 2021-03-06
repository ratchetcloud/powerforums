const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Import Models.
const Node = require("../models/nodeModel");
const Forum = require("../models/forumModel");
const Topic = require("../models/topicModel");
const Reply = require("../models/replyModel");
const User = require("../models/userModel");

// Create a node. Node can be a Forum, a Topic or a Reply.
exports.node_create = (req, res) => {
    // Constants.
    const errorServerInternal = { error: "Server internal error." };

    const user = new User(res.locals.userData);
    let newNode;

    // If a parent node was found.
    // Set node related attributes (ancestor list proceeded outside object).
    const nodeAttributes = {
        _id: new ObjectId(),
        _parentId: ObjectId(req.node.parentId),
        creationDate: new Date(),
        lastUpdatedDate: new Date(),
        authorInformation: {
            _id: user._id,
            name: user.name
        },
        ancestorList: req.node.ancestorList
    };

    switch (req.node.type) {
        case 'Forum':
            newNode = new Forum(Object.assign(nodeAttributes, {
                description: req.node.description,
                title: req.node.title,
                replyCount: 0
            }));
            break;

        case 'Topic':
            newNode = new Topic(Object.assign(nodeAttributes, {
                title: req.node.title,
                content: req.node.content,
                sticky: false,
                replyCount: 0
            }));
            break;

        case 'Reply':
            newNode = new Reply(Object.assign(nodeAttributes, {
                content: req.node.content,
                sticky: false
            }));
            break;

        default:
            // When not Forum/Topic/Reply. Not possible, type filed was previously filtered.
            return res.status(500).json(errorServerInternal);
    }
    
    // Save the new node in database.
    newNode
        .save()
        .then(document => {
            if (newNode.type === 'Reply') {
                Topic.findByIdAndUpdate(document._parentId, { $inc: { replyCount: 1 } })
                     .then(result => res.status(201).json(document))
                     .catch(error => res.status(500).json(error));
            } else {
                res.status(201).json(document);
            }
        })
        .catch(error => res.status(500).json(error));
};

// Get a node by ID.
exports.node_getById = (req, res) => {
    // Node is already loaded in `load`
    res.status(200).json(req.node);
};

// Update a node.
exports.node_update = (req, res) => {
    let node = req.node;

    switch (node.type) {
        case 'Topic':
        case 'Reply':
            // When node is a Topic or a Reply.
            for (let key in req.body) {
                if (!req.body.hasOwnProperty(key)) continue;
                node[key] = req.body[key];
            }

            // If update sticky flag, do not update lastUpdatedDate.
            // If want to add new exception, please add element name in has function below.
            if (req.body.hasOwnProperty('title') || req.body.hasOwnProperty('content')) {
                node.lastUpdatedDate = new Date();
            }     

            node.save()
                .then(document => res.status(201).json(document))
                .catch(error => res.status(500).json(error));
            break;

        default:
            // TODO: Forum can be changed.
            return res.status(500).json({ message: "Forum cannot be updated." })
    }
};

// Delete a node.
exports.node_delete = (req, res) => {
    // Constants.
    // const errorNotFound = { message: "Node to delete could not be found." };
    // const successDeleted = { message: "Node and its children were deleted." };

    let node = req.node;

    // delete function means soft delete. It makes 'deleted' field true.
    node.delete()
        .then(function() {
            if (node.type === 'Reply') { 
                Topic.findByIdAndUpdate(node._parentId, { $inc: { replyCount: -1 } })
                     .then(result => res.status(200).json(node))
                     .catch(error => res.status(500).json(error)); 
            } else {
                res.status(200).json(node);
            }
        })
        .catch(error => res.status(500).json(error));

    // remove function means hard delete. 
    // If need to make delete as hard delete, make above codes as annotation and use codes below.
    // node.remove()
    //     .then(document => {
    //         if (node.type === 'Reply') { 
    //             Topic.findByIdAndUpdate(document._parentId, { $inc: { replyCount: -1 } })
    //                  .then(result => res.status(200).json(document))
    //                  .catch(error => res.status(500).json(error)); 
    //         } else {
    //             res.status(200).json(document);
    //         }
    //     })
    //     .catch(error => res.status(500).json(error));

    // Code below is first design for deleting. This do hard deletion about target and its child.
    // // If nodeId exists in request and is valid.
    // // Remove the node itself, and every other node that have the nodeId in its ancestors array (=> all node children).
    // Node.find({ $or:[ {'_id': node._id}, {'ancestorList._id': ObjectId(node._id)} ] })
    //     .remove()
    //     .exec()
    //     .then(result => {
    //         // TODO: add decrease reply count of parent
    //         if (result.n > 0) {
    //             // If document was deleted.
    //             return res.status(200).json(successDeleted);

    //         }else {
    //             // If document was not deleted (not found).
    //             // It is checked at loadNodeWithPermission.
    //             return res.status(500).json(errorNotFound);
    //         }
    //     })
    //     .catch(error => {
    //         // When an error occurred during selection/deletion, return the error.
    //         return res.status(500).json(error);
    //     });
};

// Get children of a given node, with paginated information.
exports.node_getPaginatedChildren = (req, res) => {
    const perPage = (!req.query.perPage || parseInt(req.query.perPage) < 1) ?
            10 : parseInt(req.query.perPage);
    const page = (!req.query.page || parseInt(req.query.page) < 0) ?
            0 : Math.max(0, parseInt(req.query.page));
    const sort = (!req.query.sort || typeof req.query.sort === "Object") ?
            {} : req.query.sort;

    if (!req.params.nodeId)
        return res.status(500).json({ error: "Missing parameter 'parentId'." });

    let filter;
    // If user has permission to read all node including soft-deleted node,
    // return all nodes.
    if(req.permissions.has('canReadDeleted')) {
        filter = { _parentId: new ObjectId(req.params.nodeId) };
    } else {
        // If user does not have permission to read soft-deleted node,
        // return nodes except soft-deleted node.
        filter = { _parentId: new ObjectId(req.params.nodeId), 
                         deleted: false };        
    }
    Node.find(filter)
        .limit(perPage)
        .skip(perPage * page)
        .sort({ type: 'asc', sticky: 'desc', createdDate: 'asc' })
        .exec((err, documents) => {
            Node.countDocuments(filter).exec((err, count) => {
                res.status(200).json({
                    results: documents,
                    pagination: {
                        currentPage: page,
                        totalPage: count / perPage,
                        totalResult: count,
                        perPage: perPage
                    }})
            })
        });
}