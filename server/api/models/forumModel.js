var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
const Node = require("./nodeModel")
var options = { discriminatorKey: 'type' }

// Forum schema, inheriting from Node.
var ForumSchema = new mongoose.Schema({
    title: String,
    description: String,
    replyCount: Number
}, options)

var Forum = Node.discriminator('Forum', ForumSchema)

module.exports = Forum