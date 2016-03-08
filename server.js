// BASE SETUP
// =============================================================================

var fs = require('fs');
var http = require('http');
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./server/config');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================

// REGISTER OUR ROUTES -------------------------------

config.getGlobbedFiles('./server/**/*.route.js').forEach(function(routePath) {
   require(path.resolve(routePath))(app);
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('server launched on port ' + port);