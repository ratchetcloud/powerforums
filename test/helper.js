const mongoose = require("mongoose");
var server;

before(function (done) {
    let app = require('../app');

    // Truncate all collection in test db
    let promises = Object.values(mongoose.connection.collections).map((collection) => {
       return new Promise(function (resolve) {
           collection.remove(function () {
               resolve();
           });
       });
    });

    // Start server and push it to promises.
    promises.push(new Promise(function (resolve, reject) {
        server = app.listen(function (err){
            if (err) return reject();
            resolve();
        });
    }));

    Promise.all(promises)
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
