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
let url = process.env.MONGO_URI
let permisson = JSON.parse(process.env.PERMISSON);

// MongoDB 연결
let db;
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

// GET 요청으로 초기 JSON 데이터 삽입
app.get('/api/insert', async (req, res) => {
  try {
    // 삽입할 데이터 (JSON 형태로 작성)
    const RA = 'RA'; // 컬렉션 이름 지정
    let ra = [
      { 구역: '왼쪽창고', 정: '옥민구', 부: '김태현' },
      { 구역: '오른쪽창고', 정: '민준기', 부: '김학태' },
      { 구역: '쌀·소도구 창고', 정: '김학태', 부: '민준기' },
      { 구역: '잔반처리장·흡연장', 정: '한민우', 부: '윤재현' },
      { 구역: '휴게실·화장실·입구', 정: '공지원', 부: '김민석' },
      { 구역: '유제품·야채냉장고', 정: '김태현', 부: '옥민구' },
      { 구역: '냉동고', 정: '윤재현', 부: '한민우' },
      { 구역: '복도 냉장·냉동고', 정: '김민석', 부: '공지원' }
    ];

    const collection = db.collection(RA);
    const result = await collection.insertMany(ra);

    const Role = 'Role'; // 컬렉션 이름 지정
    let role = [
      {
        구역: '폐유',
        담당: '튀김당당이 폐유'
      },
      {
        구역: '엘베올리기',
        담당: '조리 최선임이 관리'
      },
      {
        구역: '보존식',
        담당: '밥 한 사람'
      },
      {
        구역: '아짬·짬통비우기',
        담당: '설거지 하는 사람'
      },
      {
        구역: '쓰레기 버리기',
        담당: '설거지, 밥 한 사람이 화부조 점심조리 저녁조리 후 바로 치우기'
      },
      {
        구역: '조미료 채우고 관리',
        담당: '국 하는 사람'
      },
      {
        구역: '식기 도구 치우기, 엘베 정리',
        담당: '설거지 하는 사람'
      },
      {
        구역: '하수구',
        담당: '막내'
      },
      {
        구역: '화구',
        담당: '설거지 하는 사람'
      },
      {
        구역: '조리실 소독기',
        담당: '아래 설거지 하는 인원'
      },
      {
        구역: '취반기 세미기',
        담당: '밥 하는 사람'
      },
      {
        구역: '후식, 소스 챙기기',
        담당: '조리 최선임'
      },
      {
        구역: '솥에 물 끓여서 엎기',
        담당: '국 한 사람이 국솥에'
      }
    ];

    const collection1 = db.collection(Role);
    const result1 = await collection1.insertMany(role);

    const COOK = 'COOK'; // 컬렉션 이름 지정
    let cook = [
      {
        역할: '국',
        담당자: '공지원'
      },
      {
        역할: '볶음',
        담당자: '김민석'
      },
      {
        역할: '튀김',
        담당자: '한민우'
      },
      {
        역할: '밥',
        담당자: '윤재현'
      },
      {
        역할: '설거지',
        담당자: '민준기'
      },
      {
        역할: '총괄',
        담당자: '김학태'
      },
      {
        역할: '칼질',
        담당자: '김태현'
      },
      {
        역할: '칼질',
        담당자: '옥민구'
      }
    ];

    const collection2 = db.collection(COOK);
    const result2 = await collection2.insertMany(cook);

    res.status(200).json({
      message: '데이터가 성공적으로 삽입되었습니다!',
      insertedId: result.insertedId
    });
  } catch (error) {
    console.error('데이터 삽입 오류:', error);
    res.status(500).json({ error: '데이터 삽입 중 오류가 발생했습니다.' });
  }
});

// GET 요청으로 컬렉션 삭제
app.get('/api/delete', async (req, res) => {
  try {
    let RA = 'RA'; // 삭제할 컬렉션 이름
    let Role ='Role';
    let COOK ='COOK'
    const collection = db.collection(RA);
    const collection1 = db.collection(Role);
    const collection2 = db.collection(COOK);
    // 컬렉션 삭제
    const result = await collection.drop();
    const result1 = await collection1.drop();
    const result2 = await collection2.drop();
    if (result) {
      res.status(200).json({
        message: `컬렉션 '${RA}'가 성공적으로 삭제되었습니다.`
      });
    } else {
      res.status(500).json({
        error: `컬렉션 '${RA}' 삭제에 실패했습니다.`
      });
    }
  } catch (error) {
    console.error('컬렉션 삭제 오류:', error);
    res.status(500).json({
      error: '컬렉션 삭제 중 오류가 발생했습니다.'
    });
  }
});

//요청한 창고관리 데이터 보내주는 api
app.get('/api/raGet', async (req, res) => {
  try {
    const collection = db.collection('RA'); // 컬렉션 이름
    const roles = await collection.find({}).toArray();
    res.status(200).json(roles);
  } catch (error) {
    console.error('데이터 조회 오류:', error);
    res.status(500).json({ error: '데이터 조회 실패' });
  }
});

//요청한 조리담당구역 데이터 보내주는 api
app.get('/api/roleGet', async (req, res) => {
  try {
    const collection = db.collection('Role'); // 컬렉션 이름
    const roles = await collection.find({}).toArray();
    res.status(200).json(roles);
  } catch (error) {
    console.error('데이터 조회 오류:', error);
    res.status(500).json({ error: '데이터 조회 실패' });
  }
});

//요청한 조리 라인 데이터 보내주는 api
app.get('/api/cookGet', async (req,res)=>{
  try {
    const collection = db.collection('COOK'); // 컬렉션 이름
    const roles = await collection.find({}).toArray();
    res.status(200).json(roles);
  } catch (error) {
    console.error('데이터 조회 오류:', error);
    res.status(500).json({ error: '데이터 조회 실패' });
  }
});


app.post('/api/dataUpdate', async (req, res) => {
  const { sendIndex, sendField, sendValue } = req.body;

  if (!sendIndex || !sendField || !sendValue) {
    res.status(400).send('모든 데이터를 입력해야 합니다.');
    return;
  }

  try {
    // 업데이트 쿼리
    const result = await db.collection('RA').updateOne(
      { 구역: sendIndex }, // 필터 조건
      { $set: { [sendField]: sendValue } } // 업데이트 내용
    );

    if (result.matchedCount > 0) {
      res.status(200).send('업데이트 성공');
    } else {
      res.status(404).send('구역을 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('업데이트 실패:', error);
    res.status(500).send('서버 오류');
  }
});

app.post('/api/roleUpdate', async (req, res) => {
  const { sendIndex, sendValue } = req.body;

  try {
    const result = await db.collection('Role').updateOne(
      { 구역: sendIndex }, // 구역으로 문서 찾기
      { $set: { 담당: sendValue } } // 담당 필드 업데이트
    );

    if (result.modifiedCount > 0) {
      res.status(200).send('업데이트 성공');
    } else {
      res.status(400).send('업데이트 실패');
    }
  } catch (error) {
    console.error('업데이트 중 오류:', error);
    res.status(500).send('서버 오류');
  }
});


// 데이터 업데이트 API
app.post('/api/cookUpdate', async (req, res) => {
  const { sendIndex, sendValue } = req.body;

  if (!sendIndex || !sendValue) {
    return res.status(400).send('필요한 데이터가 누락되었습니다.');
  }

  try {
    const result = await db.collection('COOK').updateOne(
      { 역할: sendIndex }, // 역할을 기준으로 문서 찾기
      { $set: { 담당자: sendValue } } // 담당자 필드 업데이트
    );

    if (result.modifiedCount > 0) {
      res.status(200).send('업데이트 성공');
    } else {
      res.status(404).send('업데이트 실패: 해당 역할을 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('업데이트 중 오류:', error);
    res.status(500).send('업데이트 중 서버 오류 발생');
  }
});


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
