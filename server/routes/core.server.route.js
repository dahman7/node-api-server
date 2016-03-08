'use strict';

module.exports = function(app) {
    var fs = require('fs');
    var core = require('../controllers/core.server.controller');


    //enable CORS
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


    app.route('/api')
        .get(core.default)
    app.route('/api/getUserProfile')
        .get(core.getUserProfile)
    app.route('/api/getDataGrid')
        .get(core.getDataGrid)
};