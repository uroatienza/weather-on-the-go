/**
 * SignupController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var crypto = require('crypto');

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


  },


  /**
   * /signup/web
   */ 
  web: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/signup/web.ejs
    res.view();

  },



};

function createUserInstance(req, res, token) {
  User.create({
        mobile_number : req.param("mobile_number"),
        tokens         : [token]
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