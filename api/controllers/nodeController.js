const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Import Models.
const Node = require("../models/nodeModel");
const Forum = require("../models/forumModel");
const Topic = require("../models/topicModel");
const Reply = require("../models/replyModel");

// Create a node. Node can be a Forum, a Topic or a Reply.
exports.node_create = (req, res, next) => {
    // Constants.
    const errorMissingParameter = { message: "Can't create node, a parameter is missing." };
    const errorServerInternal = { error: "Server internal error." };
    const errorParentNodeNotFound = { message: "Parent node not found." };
    const errorObjectId = { message: "Provided ObjectId is not valid." };

    // Filter node parameters.
    if (!req.body.hasOwnProperty('type') || !req.body.hasOwnProperty('parentId') || ['Forum', 'Topic', 'Reply'].indexOf(req.body.type) == -1) {
        // If a parameter is missing, return an 404 with message.
        res.status(404).json(errorMissingParameter);
    } else if(!ObjectId.isValid(req.body.parentId)) {
        // If required objectIds are not valid, return a 400 error.
        res.status(400).json(errorObjectId);

    } else {
        // Get parent node.
        Node.findById(req.body.parentId)
            .exec()
            .then(parentNode => {
                if (!parentNode) {
                    // If parent node were not found, return a 404 error.
                    res.status(404).json(errorParentNodeNotFound);
                } else {
                    // If a parent node was found.
                    // Set node related attributes (ancestor list proceeded outside object).
                    var newAncestorList = parentNode.ancestorList;
                    newAncestorList.push({_id: parentNode._id, title: 'title' in parentNode ? parentNode.title : ''});

                    const nodeAttributes = {
                        _id: new ObjectId(),
                        _parentId: ObjectId(req.body.parentId),
                        creationDate: new Date(),
                        lastupdateDate: new Date(),
                        authorInformation: { // TODO fix that after authentication system is implemented.
                            _id: ObjectId('5adfc71143e7654720578f8b'),
                            name: "Remi"
                        },
                        ancestorList: newAncestorList
                    };

                    switch (req.body.type) {
                        // Depending on the type of node to create.
                        case 'Forum':
                            // When forum creation request.
                            if (!req.body.hasOwnProperty('description')
                                || !req.body.hasOwnProperty('title')) {
                                res.status(404).json(errorMissingParameter);
                            } else {
                                var nodeChild = new Forum(Object.assign(nodeAttributes, {
                                    description: req.body.description,
                                    title: req.body.title,
                                    replyCount: 0
                                }));
                            }
                            break;
                        case 'Topic':
                            // When topic creation request.
                            if (!req.body.hasOwnProperty('content')
                                || !req.body.hasOwnProperty('description')
                                || !req.body.hasOwnProperty('title')
                                || !req.body.hasOwnProperty('sticky')) {
                                res.status(404).json(errorMissingParameter);
                            } else {
                                var nodeChild = new Topic(Object.assign(nodeAttributes, {
                                    description: req.body.description,
                                    title: req.body.title,
                                    content: req.body.content,
                                    sticky: req.body.sticky,
                                    replyCount: 0
                                }));
                            }
                            break;
                        case 'Reply':
                            // When reply creation request.
                            if (!req.body.hasOwnProperty('content')
                                || !req.body.hasOwnProperty('sticky')) {
                                res.status(404).json(errorMissingParameter);
                            } else {
                                var nodeChild = new Reply(Object.assign(nodeAttributes, {
                                    content: req.body.content,
                                    sticky: req.body.sticky
                                }));
                            }
                            break;
                        default:
                            // When not Forum/Topic/Reply. Not possible, type filed was previously filtered.
                            res.status(500).json(errorServerInternal);
                    }

                    // Save the new node in database.
                    nodeChild
                        .save()
                        .then(document => res.status(201).json(document))
                        .catch(error => res.status(500).json(error));
                }
            })
            .catch(error => {
                // When an error occurred during parent node selection, Return the error.
                res.status(500).json(error);
            });
    }
}

// Get a node by ID.
exports.node_getById = (req, res, next) => {
    // Constants.
    const errorNotFound = { message: "No valid node found for provided ID" }

    Node.findById(req.params.nodeId)
        .exec()
        .then(document => {
            if (document) {
                // If document found, return it.
                res.status(200).json(document)
            } else {
                // If document not found, return a 404 error.
                res.status(404).json(errorNotFound)
            }
        })
        .catch(error => {
            res.status(500).json(error)
        });
}

// Update a node.
exports.node_update = (req, res, next) => {
    // Constants.
    const errorMissingParameter = { message: "Can't update node, a parameter is missing." }
    const errorObjectId = { message: "Provided ObjectId is not valid." }
    const errorType = { message: "Node cannot be set sticky." }

    if (!req.body.hasOwnProperty('_id')) {
        // If a parameter is missing, return an 404 with message.
        res.status(404).json(errorMissingParameter)
    } else if(!ObjectId.isValid(req.body._id)) {
        // If mandatory parameter "_id" is not a valid ObjectId.
        res.status(500).json(errorObjectId)
    } else {
        Node.findById(req.body._id)
            .exec()
            .then(node => {
                switch (node.type) {
                    // Depending on the node type.
                    case 'Topic':
                    case 'Reply':
                        // When node is a Topic or a Reply.
                        for (key in req.body.content) {
                            // skip loop if the property is from prototype
                            if (!req.body.content.hasOwnProperty(key)) continue;
                            node[key] = req.body.content[key]
                        }
                        node.save()
                            .then(document => res.status(201).json(document))
                            .catch(error => res.status(500).json(error))
                        break;
                    default:
                        // When node is a Forum, or something else.
                        // Return an error, Forum or what cannot be set sticky.
                        return res.status(500).json(errorType)
                }

            })
            .catch(error => {
                return res.status(500).json(error)
            });
    }
}

// Delete a node.
exports.node_delete = (req, res, next) => {
    // Constants.
    const errorMissingParameter = { message: "Can't delete node, a parameter is missing." }
    const errorObjectId = { message: "Provided ObjectId is not valid." }
    const errorNotFound = { message: "Node to delete could not be found." }
    const successDeleted = { message: "Node and its children were deleted." }

    // Filter node parameters.
    if (!req.params.nodeId) {
        // If a parameter is missing, return an 404 with message.
        res.status(404).json(errorMissingParameter)
    } else if(!ObjectId.isValid(req.params.nodeId)) {
        // If nodeId is not valid, return a 400 error.
        res.status(400).json(errorObjectId)
    } else {
        // If nodeId exists in request and is valid.
        // Remove the node itself, and every other node that have the nodeId in its ancestors array (=> all node children).
        Node.find({ $or:[ { '_id': req.params.nodeId }, { 'ancestorList._id': ObjectId(req.params.nodeId) } ] })
            .remove()
            .exec()
            .then(result => {
                if (result.n > 0) {
                    // If document was deleted.
                    res.status(200).json(successDeleted)
                } else {
                    // If document was not deleted (not found).
                    res.status(500).json(errorNotFound)
                }
            })
            .catch(error => {
                // When an error occurred during selection/deletion, return the error.
                res.status(500).json(error)
            });
    }
}

// Get children of a given node, with paginated information.
exports.node_getPaginatedChildren = (req, res, next) => {
    if (!req.body.perPage || parseInt(req.body.perPage) < 1) {
        var perPage = 1
    } else {
        var perPage = parseInt(req.body.perPage)
    }

    if (!req.body.page || parseInt(req.body.page) < 0) {
        var page = 0
    } else {
        var page = Math.max(0, parseInt(req.body.page))
    }

    if (!req.body.sort || typeof req.body.sort === "Object") {
        var sort = req.body.sort
    } else {
        var sort = {}
    }

    if (!req.body.parentId) {
        res.status(500).json({ error: "Missing parameter 'parentId'." })
    } else {
        var filter = { _parentId: new ObjectId(req.body.parentId) }

        Node.find(filter)
            .limit(perPage)
            .skip(perPage * page)
            .sort({ type: 'asc', sticky: 'desc', createdDate: 'asc' })
            .exec((err, documents) => {
                Node.count(filter).exec((err, count) => {
                    res.status(200).json({
                        results: documents,
                        pagination: {
                            currentPage: page,
                            totalPage: count / perPage,
                            totalResult: count,
                            perPage: perPage
                        }
                    })
                })
            })
    }
}