const express = require('express');
const Messages = require('../../models/Message');
const router = express.Router();


router.post('/', (req,res,next) => {
  if (req.user){
    const {total, showNum, page} = req.body;
    if (total == null){
      Messages.find({recipient : req.user.id}).sort({$natural : -1})
        .then(data=> 
          res.send({
            list: data.slice(0,showNum),
            total: data.length,
            page : page
          })
        )
        .catch(err=> next(err));
    }else {
      Messages.find({recipient:req.user.id}).sort({$natural : -1}).skip((page-1) * showNum).limit(showNum)
        .then(data=> 
          res.send({
            list: data,
            total: total,
            page: page
          }))
        .catch(err=> next(err));
    }
  }
  else{
    res.send([])
  }
});

router.get('/unseenmessages',(req,res,next)=>{
  if (req.user){
    Messages.countDocuments({recipient: req.user.id, seen: false})
      .then(num=> res.send({unseenNumber: num}))
      .catch(err=> next(err));   
  }else{
    res.send("로그인이 필요합니다.")
  }
})
module.exports = router;