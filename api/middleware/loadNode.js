const Node = require("../models/nodeModel");

const errorNotFound = { message: "No valid node found for provided ID" }

module.exports = (req, res, next) => {
    if (req.params.nodeId) {
        // Get, update, and delete
        Node.findById(req.params.nodeId)
            .exec()
            .then(document => {
                if (!document) {
                    res.status(404).json(errorNotFound);
                    return;
                }
                req.node = document;
                req.nodeAuthor = document.authorInformation._id;
                next();
            })
            .catch(error => {
                res.status(500).json(error)
            });
    }else{
        // Create
        req.node = req.body;
        req.nodeAuthor = false;
        next();
    }
};