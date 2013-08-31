var cronJob = require('cron').CronJob;
var http 	= require("http");

new cronJob('* * * * * *', function(){
    console.log('You will see this message every second');
}, null, true, "America/Los_Angeles");