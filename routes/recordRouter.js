var express = require('express');
var router = express.Router();
var Xvfb = require('xvfb');

/* GET home page. */
router.get('/', function(req, res, next) {
  var arr=[];
  for(var key in req.terms){
    arr.push(key);
  }
  res.json({staus:get, terms:arr });


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
      res.terms["d_"+xvfb._display]=xvfb;
      res.status(200).json({message:"started",res:xvfb._display});
    }
  });
});
router.post('/stopRecord', function(req, res, next) {

  if(! req.terms["d_"+req.body.id])
    return res.status(404).json({status:-1})

  req.terms["d_"+req.body.id].stop(function (err) {
      if(err){
        console.warn(err);
        return res.status(500).json({status:-1, message:err})
      }
      res.status(200).json({status:1})
      console.log("Xvfb server stopped ", err);
    });
})

module.exports = router;

