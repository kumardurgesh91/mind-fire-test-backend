// FileName: index.js
// Import express
const express = require('express');
const bodyParser = require('body-parser');
// Import Mongoose
const mongoose = require('mongoose');
const cors = require('cors')

const apiRoutes = require("./api-routes");
// Initialize the app
const app = express();
const config = require('./config');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
// Connect to Mongoose and set connection variable
mongoose.connect(config.db_url);
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
    process.exit(1);
});
mongoose.connection.on('open', function (ref) {
    console.log('Connected to Mongo server...');
    startServer();
});

function startServer() {
    let port = process.env.PORT || 8080;
// Send message for default URL
    app.use('/api', apiRoutes);
    app.get('/', (req, res) => res.send('Hello World from mindfire'));
    app.listen(port, function () {
        console.log("Running mind fire test backend on port " + port);
    });
    app.use(function (err, req, res, next) {
        console.log(err);
        return res.send(400, err);
    });
}