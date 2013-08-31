/**
 * HomeController
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
   * /home/index
   */ 
  index: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/home/index.ejs
    var message = null;

    if(req.session.message != undefined || req.session.message != null) {
      message = req.session.message;

      req.session.message = null;
    }



    var data = {
      title   :   'Weather On To Go | Home',
      message :   message
    };
    res.view(data);
    
  },


  /**
   * /home/about
   */ 
  about: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/home/about.ejs
    res.view();

  },


  /**
   * /home/contact
   */ 
  contact: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/home/contact.ejs
    res.view();

  }

};
