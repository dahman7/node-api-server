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

var jsf = require('json-schema-faker');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port


//Global functions

app.locals.getJsonFiles= function(file,callback) {
   var filePath = path.join(__dirname, 'server/data/', file);
   var encoding = 'utf8';
   if (app.locals.dataJson && app.locals.dataJson[file]) {
      //using file from memory
      callback();
   } else {
      fs.readFile(filePath, encoding, function (err, data) {
         console.log(data);
         if (!err) {
            var jsonParsed = JSON.parse(data);
            //put file in memory
            if (!app.locals.dataJson) {
               app.locals.dataJson = [];
            }
            app.locals.dataJson[file] = jsonParsed;
            callback();
         } else {
            callback(err);
         }
      });
   }
};
app.locals.getFakeJson = function(file,config,callback) {
   var filePath = path.join(__dirname, 'server/schema/', file);
   var schema = require(filePath)(app,config);
   var data = jsf(schema);

   callback(data);
};
app.locals.getRandomIntInclusive = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
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