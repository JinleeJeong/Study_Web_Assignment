const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var user = require('./routes/user');

var app = express();


app.use(bodyParser.urlencoded({ 
    extended: true })
);
app.use(bodyParser.json());

// CONNECTED TO MONGODB SERVER
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/usertest', { useMongoClient: true, promiseLibrary: require('bluebird') })
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));

// ===========================

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/api/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



// let newUser = new UserInfo(
//     {
//     name : 'Jinlee', 
//     body : 'body',
//     password : '1234'
// }); 
// ========================== 직접 삽입 예시

// newUser.save((error,data) => {
//     if(error) {
//         console.log(error);
//     }else {
//         console.log('Saved!');
//     }
// });
// ========================== 직접 저장 예시

// UserInfo.find((error, users) => {
//   console.log('--- Read all ---');
//   if(error){
//       console.log(error);
//   }else{
//       console.log(users);
//   }
// });
// ========================== 직접 출력 예시

