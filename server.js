// 필요한 모듈 가져오기
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3030;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let permisson = JSON.parse(process.env.PERMISSON);

// MongoDB 연결
let db;
let url =
  'mongodb+srv://admin:rlaxogus0421@eagleskp.tc3ce.mongodb.net/?retryWrites=true&w=majority';
new MongoClient(url)
  .connect()
  .then(client => {
    console.log('DB 연결 성공');
    db = client.db('eaglesKp');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB 연결 실패:', err);
    process.exit(1);
  });

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//권한 획득 api
app.post('/api/permissonChk', (req, res) => {
  let sendPermisson = req.body;
  if (
    permisson.permissonId === sendPermisson.sendId &&
    permisson.permissonPw === sendPermisson.sendPw
  ) {
    res.status(200).send('권한 획득 성공');
  } else {
    res.status(401).send('권한 획득 실패');
  }
});

// React 정적 파일 제공
app.use(express.static(path.join(__dirname, 'client/build')));

// React 라우트 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
