const mongoose = require('mongoose');
const Node = require("./nodeModel");
const options = { discriminatorKey: 'type' };

// Topic schema, inheriting from Node.
const TopicSchema = new mongoose.Schema({
    title: String,
    content: String,
    replyCount: Number,
    sticky: Boolean
}, options);

module.exports = Node.discriminator('Topic', TopicSchema);