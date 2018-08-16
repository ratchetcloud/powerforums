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
    permissions: [{
        _userGroupId: mongoose.Schema.Types.ObjectId,
        _nodeId: mongoose.Schema.Types.ObjectId
    }],
    password: String,
});

module.exports = mongoose.model('User', UserSchema);