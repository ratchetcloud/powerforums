var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

// User schema.
var SessionSchema = new mongoose.Schema({
    _id: ObjectId,
    userId: ObjectId,
    creationDate: Date,
    lastActivityDate: Date
})

var Session = mongoose.model('Session', SessionSchema)

module.exports = mongoose.model('Session', SessionSchema)