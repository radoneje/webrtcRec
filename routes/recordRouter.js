var express = require('express');
var router = express.Router();
var Xvfb = require('xvfb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({staus:get, term:req.terms});


});

router.post('/startRecord', function(req, res, next) {
  var xvfb = new Xvfb();
  xvfb.start(function(err, xvfbProcess) {
    if(err) {
      console.warn(err);
      res.status(500).json(err);
    }
    else {
      console.log(xvfb);


      setTimeout(()=>{
        xvfb.stop(function (err) {
          res.status(200).json({message:"started",res:xvfb._display});
          console.log("Xvfb server stopped ", err);
        });
      },2*1000);
    }
  });
});

module.exports = router;

