const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require('fs');

// MongoDB connection.
const mongoEnv = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '27017',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    db: process.env.DB_NAME || 'powerforums'
};
mongoose.connect('mongodb://' +
    ((mongoEnv.username !== "") ? (mongoEnv.username + ':' + mongoEnv.password + '@') : '') +
    mongoEnv.host + ':' + mongoEnv.port + '/' + mongoEnv.db
, {useNewUrlParser: true});


// Load or generate JWT Key
let jwtKey;
try {
    jwtKey = fs.readFileSync('.jwtkey', 'utf8');
}catch (e) {
    jwtKey = (new Date()).valueOf().toString(16) + (Math.random() * Math.pow(10, 20)).toString(16);
    fs.writeFileSync('.jwtkey', jwtKey, 'utf8');
}
global.JWT_KEY = jwtKey;


// Include routes files.
const nodeRoutes = require('./api/routes/nodeRoutes');
const reportRoutes = require('./api/routes/reportRoutes');
const userRoutes = require('./api/routes/userRoutes');
const roleRoutes = require('./api/routes/roleRoutes');

// Log received requests.
if (process.env.MODE !== 'test')
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

// Routes handled.
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