const express = require('express');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
// Item Model
// Routing refers to how an application’s endpoints (URIs) respond to client requests. For an introduction to routing, see Basic routing.
const User = require('../../models/Users');
const mailer = require('../../service/mailer');

//const secretToken = randomstring.generate();
const secretToken = "11";
const router = express.Router();

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

router.post('/register', async (req, res) => {

  let email =  req.body.email;
  let password = req.body.password;
  let name = req.body.name;  
/*
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
  */
  const html = `안녕하세요,
  <br/>
  회원가입을 위해서 아래의 링크를 눌러주세요.
  <br/>
  ToKen: <b>${secretToken}</b>
  <br/>
  <a href=http://localhost:5000/api/users/verify?token=${secretToken}> 인증확인 </a>
  <br/>
  <br/>
  감사합니다.`;

  //newUser.password = await User.hashPassword(newUser.password);

  await mailer.sendEmail('yjs08090@naver.com', email,'이메일을 통해 인증해주세요', html);


  /*
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        newUser.password = hash;

        newUser.save()
          .then(user=>res.json(user))
          .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000){
              return res.status(500).send({ success : false, message : '이미 가입된 이메일입니다.'});
            }
          });
      });
  });
  */

});

router.get('/verify',(req,res)=>{
  const userToken = req.query.token;

  if (userToken === secretToken){
    
    newUser = new User ({
      email: "email",
      password: "password",
      name: "name",
      address: null ,
      interests: null ,
      image: null ,
      sex: null ,
      birth: null ,
      about: null ,
    });
  
    newUser.save()
      .then(user=>res.json(user))
      .catch(err => {
        if (err.name === 'MongoError' && err.code === 11000){
          return res.status(500).send({ success : false, message : '이미 가입된 이메일입니다.'});
        }
      });

      res.json("계정 등록 성공했습니다.");

  }
  else {
    res.json("토큰이 일치하지 않습니다.");
  }
});

module.exports = router;