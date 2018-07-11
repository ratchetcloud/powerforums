var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
const Node = require("./nodeModel");
var options = { discriminatorKey: 'type' };

// Topic schema, inheriting from Node.
var TopicSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    replyCount: Number,
    sticky: Boolean
}, options);

var Topic = Node.discriminator('Topic', TopicSchema);

module.exports = Topic;