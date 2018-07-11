const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

if (process.env.DB_USERNAME == "") {
    var connectString = "mongodb://" +
        process.env.DB_HOST + ":" +
        process.env.DB_PORT + "/" +
        process.env.DB_NAME;
} else {
    var connectString = "mongodb://" +
        process.env.DB_USERNAME +
        ":" +
        process.env.DB_PASSWORD +
        "@" +
        process.env.DB_HOST +
        ":" +
        process.env.DB_PORT +
        "/" +
        process.env.DB_NAME;
}

// MongoDB connection.
mongoose.connect(connectString);

// Include routes files.
const nodeRoutes = require('./api/routes/nodeRoutes');
const reportRoutes = require('./api/routes/reportRoutes');
const userRoutes = require('./api/routes/userRoutes');
const roleRoutes = require('./api/routes/roleRoutes');

// Log received requests.
app.use(morgan('dev'));

// Allow to parse post body fields (JSON encoded).
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle CORS.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes handeled.
app.use('/node', nodeRoutes);
app.use('/report', reportRoutes);
app.use('/user', userRoutes);
app.use('/role', roleRoutes);

// No route found.
// Return 404.
app.use((req, res, next) => {
    const error = new Error('Endpoint not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: { message: error.message } });
});

module.exports = app;