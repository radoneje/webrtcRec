var express = require('express');
var router = express.Router();
var Xvfb = require('xvfb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(req.terms);


});

router.post('/startRecord', function(req, res, next) {
  var xvfb = new Xvfb();
  xvfb.start(function(err, xvfbProcess) {
    if(err) {
      console.warn(err);
      res.status(500).json(err);
    }
    else {
      res.status(200).json(xvfb);
      setTimeout(()=>{
        xvfb.stop(function (err) {
          console.log("Xvfb server stopped ", err);
        });
      },10*1000);
    }
  });
  res.json(req.terms)
});

module.exports = router;
