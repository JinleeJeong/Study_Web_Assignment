const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const messages = require('./routes/api/messages');
const passport = require('passport');
const session = require('express-session');
const sockets = require('./socket/socket');
const cors = require('cors')

const app = express();
app.use(cors());
//DB config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose.connect(db)
  .then(()=>console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Bodyparser Middleware
app.use(bodyParser.json());

const sessionMiddleware = session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
});

//Express Session 
app.use(sessionMiddleware);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Use Routes
app.use('/api/users',users);
app.use('/api/messages',messages);

const port = process.env.PORT || 5000;

let server = app.listen(port,() => {
  console.log(`Server started on port ${port}`)
  sockets.init(server,sessionMiddleware);
});


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