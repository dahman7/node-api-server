'use strict';

module.exports = function(app) {
    var fs = require('fs');
    var bodyParser = require('body-parser');
    var search = require('../controllers/search.server.controller');


    app.use(bodyParser.json({ type: 'application/*+json' }));

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.route('/search/byKeywords')
        .post(search.getDataByKeywords)
        .get(search.getDataByKeywords);
};