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
    res.view();

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