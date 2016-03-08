'use strict';


var getJsonFiles= function(file,req,callback) {
    var path = require("path"),
        fs = require("fs");

    var filePath = path.join(__dirname, '../data/', file);
    var encoding = 'utf8';
    if (req.app.locals.dataJson && req.app.locals.dataJson[file]) {
        //using file from memory
        callback();
    } else {
        fs.readFile(filePath, encoding, function (err, data) {
            if (!err) {
                var jsonParsed = JSON.parse(data);
                //put file in memory
                if (!req.app.locals.dataJson) {
                    req.app.locals.dataJson = [];
                }
                req.app.locals.dataJson[file] = jsonParsed;
                callback();
            } else {
                callback(err);
            }
        });
    }
};
exports.default = function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
};

exports.getUserProfile = function(req, res) {
    getJsonFiles('user.json',req,function(err){
        if(err){
            res.json({ error: err });
        }else{
            res.json(req.app.locals.dataJson['user.json']);
        }
    });

};
exports.getDataGrid = function(req, res) {
    getJsonFiles('datagrid.json',req,function(err){
        if(err){
            res.json({ error: err });
        }else{
            res.json(req.app.locals.dataJson['datagrid.json']);
        }
    });
};