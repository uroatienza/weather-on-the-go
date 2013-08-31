/**
 * SignupController
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
   * /signup/mobile
   */ 
  mobile: function (req,res) {
    if(req.param("_csrf") == undefined) {
      return res.redirect("/",200);
    }else {
      return res.send(_csrf);
    }

  },


  /**
   * /signup/web
   */ 
  web: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/signup/web.ejs
    res.view();

  }

};
