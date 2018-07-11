const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

// Import controllers.
const ReportController = require('../controllers/reportController');

// Create a new report.
router.put('/', checkAuth, ReportController.report_create);

module.exports = router;