const User = require("../api/models/userModel");
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
            // Load fixture users
            return new Promise(function (resolve, reject) {
                User.collection.insertMany(require('./fixtures/users'), function (err, r) {
                    if (err) reject(err);
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
