const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
// Load User Model
const {GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET} = require('./keys');
const {NAVER_CLIENT_ID,NAVER_CLIENT_SECRET} = require('./keys');


function socialLogin (service,profile,done){
  let userProfile = {
    email: profile.emails[0].value,
    password: null,
    name: null,
    address: null ,
    interests: null ,
    image: null ,
    sex: null ,
    birth: null ,
    about: null ,
    strategy: service,
    verified: true,
  }

  switch(service){
    case 'Google':
      userProfile.name = profile.name.familyName + profile.name.givenName;
      userProfile.gender = profile.gender;
      break;
    
    case 'Naver':
      userProfile.name = profile.displayName
      break;

    default:
      break;
  }

  User.findOne({email: userProfile.email})
    .then(user => {
      if (!user){
        newUser = new User(userProfile)

        newUser.save()
          //null -> 초기 요청 페이지로 돌아간다.
          .then(user => done(null,user,{state: 'fail', message:'로그인에 성공했습니다.', url: 'http://localhost:3000'}))
          .catch(err => done(err,null,{state: 'fail', message:'회원 가입중 오류가 발생했습니다.', url: null}));   

      }else{
        return done(null,user,{state: 'success', message:'로그인에 성공했습니다.', url: 'http://localhost:3000'});
      }
    })
    .catch(err => done(err,null,{state: 'fail', message:'회원 조회중 오류가 발생했습니다.', url: null}));
}

module.exports = (passport) => {
  passport.use(

    new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
      //Match User
      User.findOne({email: email})
        .then(user => {

          if (!user) {
            return done(null, null,{state: 'fail', message: '등록되지 않은 email입니다.', url:'/signin'});
          }
          
          if (user.password == null && user.strategy != 'local') {
            return done(null, null, {state: 'fail', message: '비밀번호가 일치하지 않습니다.', url:'/signin'});
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) return new Error(err);

            if(isMatch) {
              console.log("this2")
              // executing done method -> passport.serializeUser
              return done(null, user, {state: 'success', message: '로그인에 성공했습니다.', url:''});
            } else{
              console.log("hi")
              return done(null, null, {state: 'fail', message: '비밀번호가 일치하지 않습니다.', url:'/signin'});
            }
          });
        })
        .catch(err => {return new Error('DB 유저 검색 중 오류가 발생했습니다.')});
      })
    );

    passport.use(
      new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/users/google_auth/redirect'	
      },
      (accessToken, refreshToken, profile, done) => {
        socialLogin('Google',profile,done);
        }
      )
    );

    passport.use(
      new NaverStrategy({
        clientID: NAVER_CLIENT_ID,
        clientSecret: NAVER_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/users/naver_auth/redirect'	
      },
      (accessToken, refreshToken, profile, done) => {
        socialLogin('Naver',profile,done);
        }
      )
    );

  passport.serializeUser((user, done) =>{
    // grab a piece of identifying information from user
    // done -> next stage
    // put only user.id into a cookie 
    done(null,user.id);
  });

  passport.deserializeUser((id, done) => {
    // just retrieving the user id from cookie which a browser sent
    // find the user based on user id that mongodb gives it
    User.findById(id, (err, user) => {
      // parameter user is user object from mongodb
      // passing the user to next stage
      done(err, user);
    })
  });
}
