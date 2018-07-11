var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

// User schema.
var UserSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    accountId: String,
    permissions: Array,
    password: String
});

var User = mongoose.model('User', UserSchema)

module.exports = mongoose.model('User', UserSchema)