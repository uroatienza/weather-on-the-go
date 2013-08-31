/**
 * SignupController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var crypto = require('crypto');
var http   = require("http");
var querystring = require('querystring');

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  
  /**
   * /signup/mobile
   */ 
  mobile: function (req,res) {
    if(req.param("_csrf") == undefined) {
       res.redirect("/",200);
       return;
    }
    if(req.param("mobile_number") == undefined || req.param("mobile_number") == "") {
       res.redirect("/",200);
       return;
    }

    crypto.randomBytes(8, function(ex, buf) {

      var token = {
        token   : buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-'),
        created : new Date(), //today
        expires : new Date(new Date().getTime() + (24 * 60 * 60 * 1000)), //tomorrow,
        active  : true
      };
      sendFireFlyRequest(req, res, token);
    });


  },

  verify : function(req, res) {

    res.view();
  },

  confirm : function(req, res) {
    if(req.param("_csrf") == undefined || req.param("_csrf") == "") {
      req.session.message = {
        type    : "error",
        message : "Session may be expired! Please clear all cookies and cache."
      };
      res.redirect("/signup/verify");
      return;
    }

    if(req.param("mobile_number") == undefined || req.param("mobile_number") == "" ||
       req.param("verify_token") == undefined || req.param("verify_token") == "") {
      req.session.message = {
        type      : "error",
        message   : "Please complete all fields to be able to verify your account!"
      };
      res.redirect("/signup/verify");
      return;
    }

    User.findOne({
      mobile_number   : req.param("mobile_number"),
      // "tokens.token"  : req.param("verify_token")
    }).done(function(err, user){
        var tokens = user.tokens;
        
        for(var i = 0; i < tokens.length; i++) {
          tokens[i].active = false;
        }

        user.active = true;

        user.tokens = tokens;

        user.save(function(err) {
            if(err) {
              req.session.message = {
                type      : "error",
                message   : "A database error has occured."
              };
              res.redirect("/signup/verify");
              return;
            }
            res.redirect("/user/dashboard");
        });
    });


  },
  /**
   * /signup/web
   */ 
  web: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/signup/web.ejs
   
  },



};

function createUserInstance(req, res, token) {
  User.create({
        mobile_number : req.param("mobile_number"),
        tokens        : [token],
        active        : false
      }).done(function( err , user) {
          if(err) {
            req.session.message = {
              type      : 'error',
              message   :  'A database error has occured'
            };
            res.redirect("/");
          }else {
            req.session.message = {
              type      :   'success',
              message   :   'Your phone number has been updated to the database please send the validation token that has been texted to you.'
            };

            res.redirect("/");
          }
      });
}

function updateUserInstance(req, res, token, user) {
    var tokens = user.tokens;
    for(var i = 0; i < tokens.length; i++) {
      tokens[i].active = false;
    }
    crypto.randomBytes(8, function(ex, buf) {

      var token = {
        token   : buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-'),
        created : new Date(), //today
        expires : new Date(new Date().getTime() + (24 * 60 * 60 * 1000)), //tomorrow,
        active  : true
      };
      tokens.push(token);

      user.tokens = tokens;

      user.save(function(err) {
        if(err) {
          req.session.message = {
              type      : 'error',
              message   :  'A database error has occured'
            };
            res.redirect("/");
          }else {
            req.session.message = {
              type      :   'success',
              message   :   'Your phone number has been updated to the database please send the validation token that has been texted to you.'
            };

            res.redirect("/");
          }
      });
    });
}

function sendFireFlyRequest(req, res, token) {
  var post_data = querystring.stringify({
          'api'     :   'MxKN8TTCvSgzJa5zBdqE',
          'number'  :   req.param('mobile_number'),
          'message' :   "Thanks for registering with WeatherOnTheGo. \n\nVerification Code: "+token.token+"\n\n Use it to confirm your account. -WOTG Team"
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

    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));

    result.setEncoding("utf8");

    result.on('data', function(chunk) {
      console.log(chunk);
      User.findOne({
        mobile_number : req.param("mobile_number")
      }).done(function(err, user) {
        if(err || !user || user == undefined || user == null) {
          return createUserInstance(req, res, token);
        }else {
          return updateUserInstance(req, res, token, user);
        }
      });     
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