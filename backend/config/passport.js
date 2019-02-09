const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/Users');

module.exports = (passport)=> {
  passport.use(
    new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
      //Match User
      User.findOne({email: email})
        .then(user => {
          if (!user) {
            return done(null, false, {message: '등록되지 않은 email입니다.'});
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) return new Error(err);

            if(isMatch) {
              return done(null, user);
            } else{
              return done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
            }
          });
        })
        .catch(err => {return new Error('DB 유저 검색 중 오류가 발생했습니다.')});
      })
    );

  passport.serializeUser((user, done) =>{
    done(null,user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  });
}