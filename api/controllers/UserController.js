/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  
  /**
   * /user/index
   */ 
  index: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/user/index.ejs
    if(req.session.user == undefined || req.session.user == null) {
      res.redirect("/");
      return;
    }
    res.redirect("/user/dashboard");

  },


  /**
   * /user/dashboard
   */ 
  dashboard: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/user/dashboard.ejs
    if(req.session.user == undefined || req.session.user == null) {
      res.redirect("/");
      return;
    }

    var user      = req.session.user;
    var message   = null;

    if(req.session.message != undefined) {
      message = req.session.message;
      req.session.message = undefined;
    }
    

    Region.find().done(function(err, regions) {
      var data = {
        user : user,
        message : message,
        regions : regions
      };
      res.view(data);
    });
    

  },

  'save-profile' : function(req, res) {

    if(req.session.user == undefined || req.session.user == null) {
      res.redirect("/");
      return;
    }

    if(req.param("mobile_number") == undefined || 
       req.param("mobile_number") == "" || 
       req.param("email") == undefined || 
       req.param("email") == "" ||
       req.param("password") == undefined ||
       req.param("password") == "") {

        req.session.message  = {
          type : "error",
          message : "Please complete all fields before submitting"
        };
        res.redirect("/user/dashboard");
        return;
    }

    User.findOne({
      username : req.session.user.username
    }).done(function(err, user) {
      if(err) {
        req.session.message = {
          type : "error",
          message : "Database problem."
        };
        res.redirect("/user/dashboard");
        return;
      }else{
        if(req.session.user.password != req.param("password")) {
         
          req.session.message = {
            type : "error",
            message : "Password incorrect. Please Try Again."
          };
          res.redirect("/user/dashboard");
          return;
        }else {
          user.notify         = req.param("notify");
          user.email          = req.param("email");
          user.mobile_number  = req.param("mobile_number");
          user.region         = req.param("region");
          user.save(function(err) {
            if(err) {
              req.session.message = {
                type : "error",
                message : "A Database Problem occured"
              };
              res.redirect("/user/dashboard");
              return;
            }else {
              req.session.message = {
                type : "success",
                message : "The Database has been updated!"
              }
              req.session.user = user;
              res.redirect("/user/dashboard");
              return;
            }
          });
        }
      }
    });


  },

  /**
   * /user/settings
   */ 
  settings: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/user/settings.ejs
    res.view();

  }

};
