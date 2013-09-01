/**
 * BridgeController
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
   * /bridge/login
   */ 
  login: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/bridge/login.ejs
   if(req.param("username") == undefined || req.param("password") == undefined) {
      req.session.message = {
        type : "error",
        message : "Please complete all fields before continuing."
      };
   }else {
      User.findOne({
        username  : req.param("username"),
        password  : req.param("password")
      }).done(function(err, user) {
        if(err) {
          req.session.message =  {
              type    : "error",
              message : "Username and Password has mismatched!"
          };
          res.redirect("/");
          return;
        }else {
          req.session.user = user;
          res.redirect("/user/dashboard");
          return;
        }
      });
   }

  },


  /**
   * /bridge/logout
   */ 
  logout: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/bridge/logout.ejs
    req.session.user = undefined;
    res.redirect("/user/dashboard");

  },

  register: function(req, res) {
    var data = {
      title   : 'Weather On The Go | Register Now'
      
    };
    res.view(data);
  }

};
