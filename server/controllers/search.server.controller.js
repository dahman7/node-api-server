	'use strict';
	
	/**
	* function default
	* @return get a basic json response
	*/
	exports.default = function(req, res) {
	    res.json({ message: 'hooray! welcome to our search api!' });
	};

	/**
	* function getDataByKeywords
	* get random json data from our json schema
	* @return generated json data
	*/
	exports.getDataByKeywords = function(req, res) {
	    var config = {
	        currentPage : req.body.config && req.body.config.pagination ? req.body.config.pagination : req.app.locals.getRandomIntInclusive(1,15),
	        nbTotal : req.body.config && req.body.config.nbTotal ? req.body.config.nbTotal : req.app.locals.getRandomIntInclusive(50,150) ,
	        nbPerPage : req.body.config && req.body.config.nbPerPage ? req.body.config.nbPerPage :req.app.locals.getRandomIntInclusive(8,10)
	    };

	    req.app.locals.getFakeJson('search-keywords.js',config,function(data){
	        res.json(data);
	    });

	};

