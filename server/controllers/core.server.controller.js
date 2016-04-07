'use strict';

/**
* function default
* @return get a basic json response
*/
exports.default = function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
};

/**
* get user profile data from json file
* @param {object} req
* @param {object} res
* @return {object} json data
*/
exports.getUserProfile = function(req, res) {
    req.app.locals.getJsonFiles('user.json',function(err){
        if(err){
            res.json({ error: err });
        }else{
            res.json(req.app.locals.dataJson['user.json']);
        }
    });

};

/**
* get dataGrid data from json file
* @param {object} req
* @param {object} res
* @return {object} json data
*/
exports.getDataGrid = function(req, res) {
    req.app.locals.getJsonFiles('datagrid.json',function(err){
        if(err){
            res.json({ error: err });
        }else{
            res.json(req.app.locals.dataJson['datagrid.json']);
        }
    });
};

/**
* get dataGrid random data from json schema
* @param {object} req
* @param {object} res
* @return {object} json data
*/
exports.getRandomDataGrid = function(req, res) {
    var config = {
            currentPage : req.body.config && req.body.config.pagination ? req.body.config.pagination : req.app.locals.getRandomIntInclusive(1,15),
            nbTotal : req.body.config && req.body.config.nbTotal ? req.body.config.nbTotal : req.app.locals.getRandomIntInclusive(50,150) ,
            nbPerPage : req.body.config && req.body.config.nbPerPage ? req.body.config.nbPerPage :req.app.locals.getRandomIntInclusive(8,10)
        };

        req.app.locals.getFakeJson('datagrid.js',config,function(data){
            res.json(data);
        });
};