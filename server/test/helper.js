const User = require("../api/models/userModel");
const Node = require("../api/models/nodeModel");
const UserGroup = require("../api/models/userGroupModel");
global.mongoose = require("mongoose");
global.assert = require('assert');

before(function (done) {
    global.app = require('../app');

    // Truncate all collection in test db
    let promises = Object.values(mongoose.connection.collections).map((collection) => {
       return new Promise(function (resolve) {
           collection.remove(function () {
               resolve();
           });
       });
    });

    // All async job is done
    Promise.all(promises)
        .then(() => {
            // Load user fixtures
            return new Promise(function (resolve, reject) {
                let users = require('./fixtures/users');
                User.collection.insertMany(users, function (err, r) {
                    if (err) reject(err);
                    global.adminUser = users[0];
                    global.normalUser = users[1];
                    global.bannedUser = users[2];
                    global.subadminUser = users[3];
                    resolve();
                });
            });
        })
        .then(() => {
            // Load node fixtures
            return new Promise(function (resolve, reject) {
                Node.collection.insertMany(require('./fixtures/nodes'), function (err, r) {
                    if (err) reject(err);
                    resolve();
                });
            });
        })
        .then(() => {
            // Load userGroup fixtures
            return new Promise(function (resolve, reject) {
                let userGroups = require('./fixtures/userGroups');
                UserGroup.collection.insertMany(require('./fixtures/userGroups'), function (err, r) {
                    if (err) reject(err);
                    global.USER_GROUPS = {};
                    for (let userGroup of userGroups) {
                        global.USER_GROUPS[userGroup._id] = { permissions: userGroup.permissions, name: userGroup.name };
                    }
                    console.log(global.USER_GROUPS)
                    resolve();
                });
            });
        })
        .then(() => {
            // Start api server
            return new Promise(function (resolve, reject) {
                global.server = app.listen(function (err){
                    if (err) return reject();
                    resolve();
                });
            });
        })
        .then(() => {
            done();
        })
        .catch(err => {
            done(err);
        });
});

after(function () {
    server.close();
    mongoose.disconnect();
});
