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
let url = process.env.MONGO_URI;
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

//요청한 info 데이터 보내주는 api
app.get('/api/infoGet', async (req, res) => {
  try {
    const collection = db.collection('info'); // 컬렉션 이름
    const infos = await collection.find({}).sort('id', 1).toArray();
    res.status(200).json(infos);
  } catch (error) {
    console.error('데이터 조회 오류:', error);
    res.status(500).json({ error: '데이터 조회 실패' });
  }
});



//요청한 창고관리 데이터 보내주는 api
app.get('/api/raGet', async (req, res) => {
  try {
    const collection = db.collection('RA'); // 컬렉션 이름
    const roles = await collection.find({}).sort('구역', 1).toArray();
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
    const roles = await collection.find({}).sort('구역', 1).toArray();
    res.status(200).json(roles);
  } catch (error) {
    console.error('데이터 조회 오류:', error);
    res.status(500).json({ error: '데이터 조회 실패' });
  }
});

//요청한 조리 라인 데이터 보내주는 api
// app.get('/api/cookGet', async (req, res) => {
//   try {
//     const collection = db.collection('COOK'); // 컬렉션 이름
//     const roles = await collection.find({}).sort('역할', 1).toArray();
//     res.status(200).json(roles);
//   } catch (error) {
//     console.error('데이터 조회 오류:', error);
//     res.status(500).json({ error: '데이터 조회 실패' });
//   }
// });

//user 데이터 받아오기
// app.get('/api/userGet', async (req, res) => {
//   try {
//     const collection = db.collection('info'); // 컬렉션 이름
//     const users = await collection.find({}).sort('id', 1).toArray();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('데이터 조회 오류:', error);
//     res.status(500).json({ error: '데이터 조회 실패' });
//   }
// });

//RA 업데이트 api
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
//role 업데이트 api
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

//role 푸시 api
app.post('/api/rolePush', async (req, res) => {
  const { sendPush1, sendPush2 } = req.body;

  if (!sendPush1 || !sendPush2) {
    return res.status(400).send('필수 데이터가 누락되었습니다.');
  }

  try {
    const result = await db.collection('Role').insertOne({
      구역: sendPush1,
      담당: sendPush2
    });

    if (result.acknowledged) {
      res.status(200).send('데이터 추가 성공');
    } else {
      res.status(400).send('데이터 추가 실패');
    }
  } catch (error) {
    console.error('데이터 추가 중 오류:', error);
    res.status(500).send('서버 오류 발생');
  }
});

// cook 업데이트 API
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
    !sendPermisson.sendAccessValue &&
    permisson.permissonId === sendPermisson.sendId &&
    permisson.permissonPw === sendPermisson.sendPw
  ) {
    res.status(200).send('권한 획득 성공');
  } else if (sendPermisson.sendAccessValue) {
    res.status(201).send('로그아웃 버튼으로 변경');
  } else {
    res.status(401).send('권한 획득 실패');
  }
});

//cook update api
app.post('/api/infoUpdate', async (req, res) => {
  try {
    const updates = req.body.data; // React에서 전달된 데이터 배열

    for (const item of updates) {
      await db.collection('info').updateOne(
        { id: item.id }, // 'id'로 문서 필터
        { $set: { cook: item.cook } } // 'cook' 필드만 업데이트
      );
    }

    res.status(200).json({ message: '업데이트 성공' });
  } catch (error) {
    console.error('업데이트 실패:', error);
    res.status(500).json({ message: '업데이트 실패' });
  }
});

//ra update api
app.post('/api/raUpdate', async (req, res) => {
  try {
    const updates = req.body.data; // React에서 전달된 데이터 배열

    for (const item of updates) {
      await db.collection('info').updateMany(
        { id: item.id }, // 'id'로 문서 필터
        { $set: { ra1st: item.ra1st,ra2nd: item.ra2nd } // 'cook' 필드만 업데이트
        }
      );
    }

    res.status(200).json({ message: '업데이트 성공' });
  } catch (error) {
    console.error('업데이트 실패:', error);
    res.status(500).json({ message: '업데이트 실패' });
  }
});

app.post('/api/user/add', async (req, res) => {
  try {
    console.log('Request received:', req.body);

    const { sendName, sendEntryDate } = req.body;
    const userCollection = db.collection('info');

    console.log('Fetching users with 입대년월:', sendEntryDate);
    const users = await userCollection
      .find({ entryDate: sendEntryDate }) // sendEntryDate를 기준으로 검색
      .sort({ id: 1 }) // ID를 기준으로 정렬
      .toArray();
    console.log('Existing users:', users);

    // 고유 ID 계산 로직
    let suffix = 1; // 기본값
    if (users.length > 0) {
      const lastUserId = users[users.length - 1].id; // 가장 마지막 ID
      const lastSuffix = parseInt(lastUserId.slice(sendEntryDate.length), 10); // 입대년월 이후 숫자 추출
      suffix = lastSuffix + 1; // 다음 순번
    }

    const id = `${sendEntryDate}${suffix}`;
    console.log('Generated 고유ID:', id);

    // 새 사용자 추가
    const newUser = { name: sendName, entryDate: sendEntryDate, id };
    const result = await userCollection.insertOne(newUser);
    console.log('Insert Result:', result);

    res
      .status(201)
      .json({ message: '사용자가 추가되었습니다.', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: '사용자 추가 중 오류가 발생했습니다.' });
  }
});

// 사용자 삭제 API
app.delete('/api/user/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id; // 삭제할 사용자 고유ID
    const userCollection = db.collection('info');

    const result = await userCollection.deleteOne({ id : userId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: '사용자가 삭제되었습니다.' });
    } else {
      res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('사용자 삭제 중 오류:', error);
    res.status(500).json({ error: '사용자 삭제 중 오류가 발생했습니다.' });
  }
});

app.post('/api/cook/update', async (req, res) => {
  try {
    const { cookLine } = req.body;
    const cookCollection = db.collection('info');

    await Promise.all(
      cookLine.map(async item => {
        const 역할 = item.라인; // '라인'을 '역할'로 매핑
        const 담당자 = item.담당; // '담당'을 '담당자'로 매핑

        console.log('Processing item:', { 역할, 담당자 });

        if (담당자 && 담당자.trim() !== '') {
          const result = await cookCollection.updateOne(
            { 역할 },
            { $set: { 담당자 } },
            { upsert: true }
          );

          if (result.matchedCount === 0 && result.upsertedCount === 0) {
            console.error(
              `업데이트 실패: 역할 "${역할}"에 대해 작업이 수행되지 않았습니다.`
            );
          } else if (result.upsertedCount > 0) {
            console.log(
              `새 문서 생성됨: 역할 "${역할}", ID: ${result.upsertedId}`
            );
          } else {
            console.log(`기존 문서 업데이트됨: 역할 "${역할}"`);
          }
        } else {
          console.log(`Skipped empty 담당자 for 역할: ${역할}`);
        }
      })
    );

    res
      .status(200)
      .json({ message: 'COOK 데이터가 성공적으로 업데이트되었습니다.' });
  } catch (error) {
    console.error('데이터 업데이트 중 오류:', error);
    res.status(500).json({ error: '데이터 업데이트 중 오류가 발생했습니다.' });
  }
});

// React 정적 파일 제공
app.use(express.static(path.join(__dirname, 'client/build')));

// React 라우트 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
