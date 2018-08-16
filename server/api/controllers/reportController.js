const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// [Notice] make report_create as annotation 
// 			because it is not fully implemented and there is no test code.

// Import Models.
// const Report = require("../models/reportModel");


// exports.report_create = (req, res, next) => {
//     // Declare error objects for the endpoint.
//     const errorMissingParameter = { message: "Can't create report, a parameter is missing." };

//     // Filter report parameters.
//     if (!req.body.hasOwnProperty('type') || !req.body.hasOwnProperty('objectId') || !req.body.hasOwnProperty('objectInformation')
//         || !req.body.hasOwnProperty('authorId') || !req.body.hasOwnProperty('authorName') || !req.body.hasOwnProperty('reportDate')
//         || !req.body.hasOwnProperty('comment')) {
//         // If a parameter is missing, return an 404 with message.
//         res.status(404).json(errorMissingParameter);
//     } else {
//         // Create report.
//         var report = new Report({
//             _id: new ObjectId(),
//             type: req.body.type,
//             objectId: req.body.objectId,
//             objectInformation: req.body.objectInformation,
//             authorId: req.body.authorId,
//             authorName: req.body.authorName,
//             reportDate: req.body.reportDate,
//             comment: req.body.comment
//         });

//         // Save the new user in database.
//         report.save()
//             .then(doc => res.status(201).json(doc))
//             .catch(err => res.status(500).json({error: err}));
//     }
// }