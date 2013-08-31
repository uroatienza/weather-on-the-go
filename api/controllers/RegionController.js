/**
 * RegionController
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
   * /region/index
   */ 
  index: function (req,res) {

    // This will render the view: 
    // /home/gian/weather-on-the-go/views/region/index.ejs
  
    var regions = [
        {
          region_name : "Region 1",
          region_code : "reg-1",
          loc   : {
            lat   :   "16.517917800000000000",
            long  :  "120.330282700000000000"
          }
        },
        {
          region_name : "Region 2",
          region_code : "reg-2",
          loc : {
            lat   : "16.9753758",
            long  : "121.81070790000001"
          }
        },
        {
          
        }
    ];

  }

};
