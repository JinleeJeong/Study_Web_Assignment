const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose.connect(db)
  .then(()=>console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Use Routes
app.use('/api/users',users);

const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server started on port ${port}`));

/*
const app = express();

let port = 8080;

let db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost:27017/post_magazine');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

// 경로 '/' 로 들어오는 요청들은 public 폴더로 정적 라우팅합니다.
app.use('/', express.static(__dirname + '/../public'));

app.get('/hello', (req, res) => {
    return res.send('익스프레스 서버입니다.');
});
app.use('/posts', posts);

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});

*/