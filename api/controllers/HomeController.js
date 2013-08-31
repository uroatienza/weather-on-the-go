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
    var data = {
      title   :   'Weather To Go | Home',

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
