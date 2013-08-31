/**
 * SignupController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

require('crypto');

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
      return res.redirect("/",200);
    }
    if(req.param("mobile_number") == undefined || req.param("mobile_number") == "") {
      return res.redirect("/",200);
    }



    


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
