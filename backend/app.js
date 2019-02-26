var express = require('express');
var path = require('path');
var session = require('express-session'); // 세션 설정
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
// var passport = require('passport'); // 여기와
// var passportConfig = require('./passport'); // 여기
var createError = require('http-errors');

var indexRouter = require('./routes/index');
// var user = require('./routes/user');
var contents = require('./routes/contents');

var app = express();

app.use(cors());
// app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false })); // 세션 활성화
// app.use(passport.initialize()); // passport 구동
// app.use(passport.session()); // 세션 연결
// passportConfig(); // 이 부분 추가

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost:27017/studyhub?replicaSet=rs0');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/api/user', user);
app.use('/api/contents', contents);
app.use('/coverimg', express.static('coverimg'));


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


