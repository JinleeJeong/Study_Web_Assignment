const express = require('express');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
// Item Model
// Routing refers to how an application’s endpoints (URIs) respond to client requests. For an introduction to routing, see Basic routing.
const User = require('../../models/Users');
const Token = require('../../models/Token');
const mailer = require('../../service/mailer');
const passport = require('passport');
const router = express.Router();
let newUser;

// @route   GET api/Users
// @desc    Get All users
// @access Public
router.get('/', (req,res) => {
  User.find()
    .then(users=> res.json(users));
});

// @route   POST api/Users/register
// @desc    Create A Post
// @access  Public
router.post('/register', (req, res, next) => {

  let email =  req.body.email;
  let password = User.hashPassword(req.body.password);
  let name = req.body.name;  

  newUser = new User ({
    email: email,
    password: password,
    name: name,
    address: null ,
    interests: null ,
    image: null ,
    sex: null ,
    birth: null ,
    about: null ,
  });
  
  User.checkExistingUser(newUser)
    .then(dup => {
      // 가입하지 않은 경우 
      if (!dup){

        const secretToken = randomstring.generate();

        const html = `안녕하세요,
        <br/>
        회원가입을 위해서 아래의 링크를 눌러주세요.
        <br/>
        ToKen: <b>${secretToken}</b>
        <br/>
        <a href= "http://localhost:5000/api/users/verify?token=${secretToken}"> 인증확인 </a>
        <br/>
        <br/>
        감사합니다.`;

        mailer.sendEmail('yjs08090@naver.com',email,'이메일을 통해 인증해주세요', html)
          .then(() => {
            newUser.save()
              .then(() => {
                newToken = new Token({
                  //userId
                  _id: newUser._id,
                  token: secretToken
                });

                newToken.save()
                  .then(() => res.send({message: "회원가입에 성공했습니다."}))
                  .catch(err => next(err));
              })
              .catch(err => next(err));   
          })
          .catch((err)=> {next(err)})  // 유효하지 않은 이메일 사용자가 볼 수 있게 해야한다.
      }
      // 이미 가입한 경우
      else{
        res.send({message: '중복된 아이디입니다.'});
      }
    })
    .catch(err => next(err))
});

router.get('/verify',(req, res , next)=>{
  const urlToken = req.query.token;

  Token.findOne({token: urlToken})
    .exec((err, token)=> {
      
      if (err) next(err)

      if (!token){
        res.send({message: '해당하는 토큰이 존재하지 않습니다.'})
      }
      else{
        User.update({_id: token._id},{ $set: {verified: true}})
          .exec((err,user)=>{
            if (err) next(err);
            res.send({message: '토큰 인증이 완료됐습니다.'})
        });
      }
    })
});

// Login handle
router.post('/signin', passport.authenticate('local'),
  (req, res)=>{
    // If this function gets called, authentication was successful.
    res.send(req.user)
  });

module.exports = router;