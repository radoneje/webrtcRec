var express = require('express');
var router = express.Router();
var Xvfb = require('xvfb');

/* GET home page. */
router.get('/', function(req, res, next) {
  var arr=[];
  for(var key in req.terms){
    arr.push(key);
  }
  res.json({staus:1, terms:arr });

});

router.post('/startRecord', function(req, res, next) {
  var displayNum=parseInt((Math.random()*900+100));
  var xvfb = new Xvfb({
    displayNum:displayNum,//the X display to use, defaults to the lowest unused display number >= 99 if reuse is false or 99 if reuse is true.
    reuse:false, // whether to reuse an existing Xvfb instance if it already exists on the X display referenced by displayNum.
    timeout:500, //number of milliseconds to wait when starting Xvfb before assuming it failed to start, defaults to 500.
    silent:false,//don't pipe Xvfb stderr to the process's stderr.
    xvfb_args:" -screen 0 1600x1200x24+32"//xvfb_args
  });
  xvfb.start(function(err, xvfbProcess) {
    if(err) {
      console.warn(err);
      res.status(500).json(err);
    }
    else {
      console.log(xvfb);
      var id="d_"+xvfb._display.replace(":","");
      req.terms[id]=xvfb;
      res.status(200).json({message:"started",id:id});
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

