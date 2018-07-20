const mongoose = require("mongoose");

before(function (done) {
    require('../app');

    for (let collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].remove(function() {});
    }
    return done();
});