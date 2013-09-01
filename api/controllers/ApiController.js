/**
 * ApiController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var Forcast  = require('forecast.io');
var querystring = require('querystring');
var http = require("http");
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
  },


  'send-forcast' : function (req, res) {

    if(req.session.user == undefined || req.session.user == null) {
      res.redirect("/");
      return;
    }

    var options = {
      APIKey : "be4ca0bdfd85a3bcec904b2cdc85a742"
    };

    var forcast = new Forcast(options);

    Region.findOne({
      region_code : req.session.user.region
    }).done(function(err, region) {
        forcast.get(region.loc.lat, region.loc.long, function(err, res, data) {
          console.log(data.currently);
          Forcasts.create({
            region_code : region.region_code,
            forcast : data.currently
          }).done(function(err, forcast){
            return sendFireFlyRequest(req, res, forcast, req.session.user);
            res.redirect("/user/dashboard");
          });
        });
    });

  }
};


function sendFireFlyRequest(req, res, forcast, user) {
  var post_data = querystring.stringify({
          'api'     :   'MxKN8TTCvSgzJa5zBdqE',
          'number'  :   user.mobile_number,
          'message' :   "Weather forcast for today is "+forcast.forcast.summary+" with a temperature of "+forcast.forcast.temperature+" degrees brought to you by WeatherToGo"
        });

  var options = {
    hostname    : "www.semaphore.co",
    port    : 80,
    path    : "/api/sms",
    method  : "POST",
    headers : {
      'Content-Type'    :   'application/x-www-form-urlencoded',
      'Content-Length'  :   post_data.length
    } 
  };


  var request = http.request(options, function(result) {

    console.log('STATUS: ' + result.statusCode);
    console.log('HEADERS: ' + JSON.stringify(result.headers));

    result.setEncoding("utf8");

    result.on('data', function(chunk) {
      console.log(chunk);
  
    });

    result.on('close',function(e) {
        res.send("success");
    });
  });
 
  request.on('error',function(e) {
    req.session.message = {
      type    :   'error',
      message :   'An error has occured while trying to send teh message!'
    };
    console.log(e);
    res.redirect("/");
  });





  request.write(post_data);
  request.end();
}
