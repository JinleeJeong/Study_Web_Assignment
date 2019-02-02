import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import posts from './routes/posts';

const app = express();

// body-parser 사용
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

//서버 실행
let port = 8080;
app.listen(port, () => {
    console.log('Express server has started on port', port);
});

// mongodb 연결
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost:27017/web_dev_project');

// 경로 '/' 로 들어오는 요청들은 public 폴더로 정적 라우팅합니다.
app.use('/', express.static(__dirname + '/../public'));

app.get('/hello', (req, res) => {
    return res.send('익스프레스 서버입니다.');
});
app.use('/posts', posts);