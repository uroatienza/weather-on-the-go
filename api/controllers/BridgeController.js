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
    res.view();

  },


  /**
   * /bridge/logout
   */ 
  logout: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/bridge/logout.ejs
    res.view();

  },

  register: function(req, res) {
    var data = {
      title   : 'Weather On The Go | Register Now'
      
    };
    res.view(data);
  }

};
