const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Import Models.
const Node = require("../models/nodeModel");
const Forum = require("../models/forumModel");
const Topic = require("../models/topicModel");
const Reply = require("../models/replyModel");
const User = require("../models/userModel");

// TODO: `sticky` property only can be set by admin
// TODO: Missing parameter could be abstract, not by hard coded with `hasOwnProperty`

// Create a node. Node can be a Forum, a Topic or a Reply.
exports.node_create = (req, res) => {
    // Constants.
    const errorMissingParameter = { message: "Can't create node, a parameter is missing." };
    const errorServerInternal = { error: "Server internal error." };
    const errorParentNodeNotFound = { message: "Parent node not found." };
    const errorObjectId = { message: "Provided ObjectId is not valid." };

    // Filter node parameters.
    if (!req.body.hasOwnProperty('type') || !req.body.hasOwnProperty('parentId') || ['Forum', 'Topic', 'Reply'].indexOf(req.body.type) == -1) {
        // If a parameter is missing, return an 404 with message.
        return res.status(404).json(errorMissingParameter);
    }

    if(!ObjectId.isValid(req.body.parentId)) {
        // If required objectIds are not valid, return a 400 error.
        return res.status(400).json(errorObjectId);
    }

    const user = new User(res.locals.userData);
    let newNode;

    // Get parent node.
    Node.findById(req.body.parentId)
        .exec()
        .then(parentNode => {
            if (!parentNode) {
                // If parent node were not found, return a 404 error.
                return res.status(404).json(errorParentNodeNotFound);
            }

            // If a parent node was found.
            // Set node related attributes (ancestor list proceeded outside object).
            let newAncestorList = parentNode.ancestorList;
            newAncestorList.push({_id: parentNode._id, title: 'title' in parentNode ? parentNode.title : ''});

            const nodeAttributes = {
                _id: new ObjectId(),
                _parentId: ObjectId(req.body.parentId),
                creationDate: new Date(),
                lastUpdatedDate: new Date(),
                authorInformation: {
                    _id: user._id,
                    name: user.name
                },
                ancestorList: newAncestorList
            };

            switch (req.body.type) {
                case 'Forum':
                    // When forum creation request.
                    if (!req.body.hasOwnProperty('description') || !req.body.hasOwnProperty('title')) {
                        return res.status(404).json(errorMissingParameter);
                    }

                    newNode = new Forum(Object.assign(nodeAttributes, {
                        description: req.body.description,
                        title: req.body.title,
                        replyCount: 0
                    }));
                    break;

                case 'Topic':
                    // When topic creation request.
                    // if (!req.body.hasOwnProperty('content')  || !req.body.hasOwnProperty('description')
                    //     || !req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('sticky')) {
                    //     return res.status(404).json(errorMissingParameter);
                    // }
                    if (!req.body.hasOwnProperty('content') || !req.body.hasOwnProperty('title')) {
                        return res.status(404).json(errorMissingParameter);
                    }

                    newNode = new Topic(Object.assign(nodeAttributes, {
                        description: req.body.description,
                        title: req.body.title,
                        content: req.body.content,
                        sticky: req.body.sticky,
                        replyCount: 0
                    }));
                    break;

                case 'Reply':
                    // When reply creation request.
                    //if (!req.body.hasOwnProperty('content') || !req.body.hasOwnProperty('sticky')) {
                    if (!req.body.hasOwnProperty('content')) {
                        return res.status(404).json(errorMissingParameter);
                    }
                    newNode = new Reply(Object.assign(nodeAttributes, {
                        content: req.body.content,
                        sticky: req.body.sticky
                    }));
                    break;

                default:
                    // When not Forum/Topic/Reply. Not possible, type filed was previously filtered.
                    return res.status(500).json(errorServerInternal);
            }

            // Save the new node in database.
            newNode
                .save()
                .then(document => res.status(201).json(document))
                .catch(error => res.status(500).json(error));
        })
        .catch(error => {
            // When an error occurred during parent node selection, Return the error.
            res.status(500).json(error);
        });
};

// Get a node by ID.
exports.node_getById = (req, res) => {
    // Node is already loaded in `loadNode`
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
                node[key] = req.body[key]
            }
            node.save()
                .then(document => res.status(201).json(document))
                .catch(error => res.status(500).json(error));
            break;

        default:
            // TODO: Forum can be changed.
            // But some attr would be restricted like `sticky`
            return res.status(500).json({ message: "Forum cannot be updated" })
    }
};

// Delete a node.
exports.node_delete = (req, res) => {
    // Constants.
    const errorNotFound = { message: "Node to delete could not be found." };
    const successDeleted = { message: "Node and its children were deleted." };

    let node = req.node;

    // If nodeId exists in request and is valid.
    // Remove the node itself, and every other node that have the nodeId in its ancestors array (=> all node children).
    Node.find({ $or:[ {'_id': node._id}, {'ancestorList._id': ObjectId(node._id)} ] })
        .remove()
        .exec()
        .then(result => {
            if (result.n > 0) {
                // If document was deleted.
                return res.status(200).json(successDeleted);

            }else {
                // If document was not deleted (not found).
                return res.status(500).json(errorNotFound);
            }
        })
        .catch(error => {
            // When an error occurred during selection/deletion, return the error.
            return res.status(500).json(error);
        });
};

// Get children of a given node, with paginated information.
exports.node_getPaginatedChildren = (req, res) => {
    const perPage = (!req.body.perPage || parseInt(req.body.perPage) < 1) ?
            10 : parseInt(req.body.perPage);
    const page = (!req.body.page || parseInt(req.body.page) < 0) ?
            0 : Math.max(0, parseInt(req.body.page));
    const sort = (!req.body.sort || typeof req.body.sort === "Object") ?
            {} : req.body.sort;

    if (!req.body.parentId)
        return res.status(500).json({ error: "Missing parameter 'parentId'." });

    const filter = { _parentId: new ObjectId(req.body.parentId) }

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