var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
var options = { discriminatorKey: 'type' }
const mongoose_delete = require('mongoose-delete');

// Node schema, will be used by Forum/Topic/Reply models.
var NodeSchema = new mongoose.Schema({
    _id: ObjectId,
    _parentId: ObjectId,
    type: String,    
    ancestorList: Array,
    creationDate: Date,
    lastUpdatedDate: Date,
    authorInformation: Object,
}, options)

// mongoose_delete add 'deleted' field to schema 
// and some functions for soft-deleting, restoring and so on.
NodeSchema.plugin(mongoose_delete);

var Node = mongoose.model('Node', NodeSchema);

module.exports = Node;