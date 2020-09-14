var express = require('express');
const { uuid } = require('../utility/commonController');
const io = require('../utility/commonController').uuid;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(`/${uuid()}`)
});

router.get('/:roomId',(req,res)=>{
  console.log(req.params.roomId)
  res.render('room',{RoomId : req.params.roomId });
})

module.exports = router;
