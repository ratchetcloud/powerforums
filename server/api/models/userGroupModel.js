var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// UserGroup schema.
var UserGroupSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    permissions: Array
});

module.exports = mongoose.model('UserGroup', UserGroupSchema, 'userGroups');
