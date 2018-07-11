var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// Role schema.
var RoleSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    permissions: Array
});

var Role = mongoose.model('Role', RoleSchema);

module.exports = mongoose.model('Role', RoleSchema);