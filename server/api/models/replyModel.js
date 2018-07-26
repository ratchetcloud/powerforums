var mongoose = require('mongoose');
const Node = require("./nodeModel");
var options = { discriminatorKey: 'type' };

// Reply schema, inheriting from Node.
var ReplySchema = new mongoose.Schema({
    content: String,
    sticky: Boolean
}, options);

var Reply = Node.discriminator('Reply', ReplySchema);

module.exports = Reply;