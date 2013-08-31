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
          region_name : "Region 3",
          region_code : "reg-3",
          loc : {
            lat   : "15.482772200000000000",
            long  : "120.712002300000000000"
          }
        },
        {
          region_name : "Region 4",
          region_code : "reg-4",
          loc : {
            lat   : "14.1007803",
            long  : "121.07937049999998" 
          }
        },
        {
          region_name : "Region 5",
          region_code : "reg-5",
          loc : {
            lat   : "13.4209885",
            long  : "123.41367360000004",
          }
        },
        {
          region_name : "Region 6",
          region_code : "reg-6",
          loc : {
            lat   : "11.0049836",
            long  : "122.53727409999999"
          }
        },
        {
          region_name : "Region 7",
          region_code : "reg-7",
          loc : {
            lat   : "10.2968562",
            long  : "123.8886774"
          }
        },
        {
          region_name : "Region 8",
          region_code : "reg-8",
          loc : {
            lat   : "12.2445533",
            long  : "125.03881639999997"
          }
        },
        {
          region_name : "Region 9",
          region_code : "reg-9",
          loc : {
            lat   : "8.154077",
            long  : "123.25879299999997"
          }
        },
        {
          region_name : "Region 10",
          region_code : "reg-10",
          loc : {
            lat   : "8.020163499999999",
            long  : "124.68565089999993"
          }
        },
        {
          region_name : "Region 11",
          region_code : "reg-11",
          loc : {
            lat   : "7.3041622",
            long  : "126.08934060000001"
          }
        },
        {
          region_name : "Region 12",
          region_code : "reg-12",
          loc : {
            lat   : "6.270691800000000000",
            long  : "124.685650899999930000" 
          }
        },
        {
          region_name : "Region 13",
          region_code : "reg-13",
          loc : {
            lat   : "8.801456199999999",
            long  : "125.74068820000002"
          }
        },
          {
            region_name : "ARMM",
            region_code : "armm",
            loc : {
              lat   : "6.956831299999999",
              long  : "124.2421597"
            }
          },
          {
            region_name : "CAR",
            region_code : "car",
            loc : {
              lat   : "17.3512542",
              long  : "121.17188510000005"
            }
          },
          {
            region_name : "NCR",
            region_code : "ncr",
            loc : {
              lat : "14.609053700000000000",
              long : "121.022256500000030000"
            }
          }
    ];


    for(var i = 0; i < regions.length; i++) {
      Region.create(regions[i]).done(function(err, region) {
        console.log("done");
      });
    }
  }

};
