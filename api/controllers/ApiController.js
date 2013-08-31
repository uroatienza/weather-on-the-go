/**
 * ApiController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var Forcast  = require('forecast.io');


module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  
  forecast : function(req, res) {
  	var options = {
  		APIKey : "be4ca0bdfd85a3bcec904b2cdc85a742"
  	};

  	var forcast = new Forcast(options);
  	Region.find().done(function(err, regions) {
  		if(!err) {
  			regions.forEach(function(region) {
  				forcast.get(region.loc.lat, region.loc.long, function(err, res, data) {
  					console.log(data.currently);
  					Forcasts.create({
  						region_code : region.region_code,
  						forcast : data.currently
  					}).done(function(err, forcast){});
  				});
  			});
  		}else{
  			res.send("error");
  		}
  	});
  }

};
