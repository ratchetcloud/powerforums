var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// Report schema.
var ReportSchema = new mongoose.Schema({
    _id: ObjectId,
    type: String,
    objectId: ObjectId,
    objectInformation: Object,
    authorId: ObjectId,
    authorName: String,
    reportDate: Date,
    comment: String
});

var Report = mongoose.model('Report', ReportSchema);

module.exports = mongoose.model('Report', ReportSchema);