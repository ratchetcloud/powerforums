const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Import Models.
const User = require("../models/userModel");

// generate password hash
const SALT_ROUNDS = 3;

exports.user_create = (req, res, next) => {
    // Declare error objects for the endpoint.
    const errorMissingParameter = { message: "Can't create user, a parameter is missing." };

    // Filter user parameters.
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('accountId') || !req.body.hasOwnProperty('roles')) {
        // If a parameter is missing, return an 404 with message.
        res.status(404).json(errorMissingParameter)
    } else {
        // Create user.
        var user = new User({
            _id: new ObjectId(),
            name: req.body.name,
            email: req.body.email,
            accountId: req.body.accountId,
            roles: req.body.roles
        })

        // Save the new user in database.
        user.save()
            .then(document => res.status(201).json(document))
            .catch(error => res.status(500).json(error))
    }
}

exports.user_getById = (req, res, next) => {
    // Constants.
    const errorNotFound = { message: "No valid user found for provided ID" }

    User.findById(req.params.userId)
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

exports.user_getPaginated = (req, res, next) => {
    // Constants.
    const errorNotFound = { message: "No valid entry found for provided filter" }

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

    var filter = {};

    User.find(filter)
        .limit(perPage)
        .skip(perPage * page)
        .sort(sort)
        .exec((err, documents) => {
            User.count(filter).exec((err, count) => {
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

exports.user_delete = (req, res, next) => {
    // Constants.
    const errorMissingParameter = { message: "Can't delete user, a parameter is missing." }
    const errorObjectId = { message: "Provided ObjectId is not valid." }
    const errorNotFound = { message: "User to delete could not be found." }
    const successDeleted = { message: "User was deleted." }

    // Filter user parameters.
    if (!req.params.userId) {
        // If a parameter is missing, return an 404 with message.
        res.status(404).json(errorMissingParameter)
    } else if(!ObjectId.isValid(req.params.userId)) {
        // If required objectIds are not valid, return a 400 error.
        res.status(400).json(errorObjectId)
    } else {
        User.findById(req.params.userId)
            .remove()
            .exec()
            .then(result => {
                if (result.n == 1) {
                    // If document was deleted.
                    res.status(200).json(successDeleted)
                } else {
                    // If document was not deleted (not found).
                    res.status(500).json(errorNotFound)
                }
            })
            .catch(error => {
                // When an error occurred during selection, return the error.
                res.status(500).json(error)
            })
    }
}

exports.user_login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1)
                throw new Error('User not found');

            return new Promise(function (resolve, reject) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err || !result)
                        reject('Password not equal');
                    resolve(user);
                });
            });
        })
        .then(user => {
            // Send permissionRules too.
            permissions = [];
            for (let userPerm of user.permissions) {
                permissions.push({ _userGroupId: userPerm._userGroupId,
                                   _nodeId: userPerm._nodeId,
                                   permissionRules: USER_GROUPS[userPerm._userGroupId].permissions })
            }

            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                permissions: permissions
            };

            const token = jwt.sign(userData, global.JWT_KEY, { expiresIn: "1h" });

            return res.status(200).json({
                currentUser: userData,
                token: token
            });
        })
        .catch(err => {
            res.status(401).json({ message: "Authentication failed." });
        });
}

exports.user_signUp = (req, res, next) => {
    // Declare error objects for the endpoint.
    const errorMissingParameter = { message: "Can't sign up, a parameter is missing." };
    const errorDuplicateParameter = { message: "Can't sign up, duplicated user already exist."};
    const errorInvalidParameter = { message: "Can't sign up, email value is invalid."};
    const errorUnexpected = { message: "Can't sign up, unexpected error." };

    // Filter user parameters.
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')) {
        // If a parameter is missing, return an 404 with message.
        res.status(400).json(errorMissingParameter);
    } else {
        bcrypt.hash(req.body.password, SALT_ROUNDS, function(err, hash){
            // Create user.
            var user = new User({
                _id: new ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            // Save the new user in database.
            user.save()
                .then(document => res.status(201).json(document))
                .catch(error => {
                    if(error.name === 'MongoError' && error.code === 11000) {
                        return res.status(400).json(errorDuplicateParameter);
                    } else if (error.name === 'ValidationError') {
                        return res.status(400).json(errorInvalidParameter);
                    } else {
                        return res.status(500).json(errorUnexpected);
                    }  
                });
        });
    }
}