var cronJob = require('cron').CronJob;
var http 	= require("http");

new cronJob('* */03 * * * ', function(){
//new cronJob('* * * * * *', function() {
   var options = {
   		host : "localhost",
   		port : 1337,
   		path : "/api/forecast",
   		method : "GET"
   };

   var request = http.get(options, function(res) {
   		console.log('Data initiated');
   		res.on('data', function(chunk) {
   			console.log("added data "+chunk);
   		});

   		res.on('end',function() {
   			console.log("data ended..");
   		});
   });

   request.on('error',function(e) {
   	console.log(e);
   });



}, null, true, "China/Beijing");