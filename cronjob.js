var cronJob = require('cron').CronJob;
var http 	= require("http");

//new cronJob('* */03 * * * ', function(){
new cronJob('* * * * * *', function() {
   var options = {
   		host : "localhost:1337",
   		port : 80,
   		path : "/api/forcast",
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



}, null, true, "China/Beijing");