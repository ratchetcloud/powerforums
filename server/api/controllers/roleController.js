const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Import Models.
const Role = require("../models/roleModel");

exports.role_create = (req, res, next) => {
    // Declare error objects for the endpoint.
    const errorMissingParameter = { message: "Can't create role, a parameter is missing." };

    // Filter role parameters.
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('permissions')) {
        res.status(404).json(errorMissingParameter);
    } else {
        // Create role.
        var role = new Role({
            _id: new ObjectId(),
            name: req.body.name,
            permissions: req.body.permissions
        });

        // Save the new role in database.
        role.save()
            .then(document => res.status(201).json(document))
            .catch(error => res.status(500).json(error));
    }
}

exports.role_getPaginated = (req, res, next) => {
    // Constants.
    const errorNotFound = { message: "No valid entry found for provided filter" };

    if (!req.body.perPage || parseInt(req.body.perPage) < 1) {
        var perPage = 1;
    } else {
        var perPage = parseInt(req.body.perPage);
    }

    if (!req.body.page || parseInt(req.body.page) < 0) {
        var page = 0;
    } else {
        var page = Math.max(0, parseInt(req.body.page));
    }

    if (!req.body.sort || typeof req.body.sort === "Object") {
        var sort = req.body.sort;
    } else {
        var sort = {};
    }

    var filter = {};

    Role.find(filter)
        .limit(perPage)
        .skip(perPage * page)
        .sort(sort)
        .exec((err, documents) => {
            Role.count(filter).exec((err, count) => {
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
        });
}

exports.role_delete = (req, res, next) => {
    // Constants.
    const errorMissingParameter = { message: "Can't delete role, a parameter is missing." };
    const errorObjectId = { message: "Provided ObjectId is not valid." };
    const errorNotFound = { message: "Role to delete could not be found." };
    const successDeleted = { message: "Role was deleted." };

    // Filter role parameters.
    if (!req.params.roleId) {
        // If a parameter is missing, return an 404 with message.
        res.status(404).json(errorMissingParameter);
    } else if(!ObjectId.isValid(req.params.roleId)) {
        // If required objectIds are not valid, return a 400 error.
        res.status(400).json(errorObjectId);
    } else {
        Role.findById(req.params.roleId)
            .remove()
            .exec()
            .then(result => {
                if (result.n == 1) {
                    // If document was deleted.
                    res.status(200).json(successDeleted);
                } else {
                    // If document was not deleted (not found).
                    res.status(500).json(errorNotFound);
                }
            })
            .catch(error => {
                // When an error occurred during selection, return the error.
                res.status(500).json(error);
            });
    }
}