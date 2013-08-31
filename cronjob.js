var cronJob = require('cron').CronJob;
var http 	= require("http");

new cronJob('* */03 * * * ', function(){
    console.log('You will see this message 3 hours');
}, null, true, "China/Beijing");