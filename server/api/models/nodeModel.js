var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
var options = { discriminatorKey: 'type' }

// Node schema, will be used by Forum/Topic/Reply models.
var NodeSchema = new mongoose.Schema({
    _id: ObjectId,
    _parentId: ObjectId,
    type: String,
    creationDate: Date,
    lastupdateDate: Date,
    authorInformation: Object,
    ancestorList: Array
}, options)

var Node = mongoose.model('Node', NodeSchema)

module.exports = Node