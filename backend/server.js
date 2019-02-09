const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const passport = require('passport');
const session = require('express-session');

const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose.connect(db)
  .then(()=>console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Bodyparser Middleware
app.use(bodyParser.json());

require('./config/passport')(passport);

//Express Session 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use Routes
app.use('/api/users',users);

const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server started on port ${port}`));

//error handlers should always be at the end of application stack
//나중에 production and development 구분
app.use(function(err, req, res, next) {
  console.log(err.stack)
  res.status(err.status || 500);
  res.send({
      error: err,
      message:err.message
  });
});