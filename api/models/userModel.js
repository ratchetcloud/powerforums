const mongoose = require('mongoose');

// User schema.
const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    accountId: String,
    permissions: Array,
    password: String,
    isAdmin:Boolean // TODO: move this feature to permissions or roles
});

module.exports = mongoose.model('User', UserSchema);