# EaglesKp - 취사병 업무 관리 시스템

군부대 취사병의 업무를 편리하게 관리하기 위한 **PWA 웹앱**입니다.  
조리라인 배정, 창고 담당 구역, 조리 시 담당구역을 모바일에서 손쉽게 확인하고 수정할 수 있습니다.
---
## screenshot
|권한 획득 전 실행화면|권한 획득 후 실행화면|
|-|-|
|<img src="screenshot.gif" width="70%" alt="실행 화면">|<img src="permission_screenshot.gif" width="70%" alt="권한 획득 후 실행 화면">|

---

## 기술 스택

| 구분 | 기술 / 버전 |
|------|------|
| 프론트엔드 | ![React](https://img.shields.io/badge/React-19-skyblue?logo=React) ![PWA](https://img.shields.io/badge/PWA-red) |
| 백엔드 | ![Node.js](https://img.shields.io/badge/Node.js-22-green?logo=Node.js), ![Express](https://img.shields.io/badge/Express-green) |
| 데이터베이스 | ![MongoDB](https://img.shields.io/badge/MongoDB-lightgreen?logo=MongoDB) |
| 배포 | ![Docker](https://img.shields.io/badge/Docker-lightblue?logo=Docker), ![cloudType](https://img.shields.io/badge/CloudType-black?logo=cloudtype) |

---

## 주요 기능

### 메인 페이지 (탭 3개)
- **조리라인** - 각 취사병의 조리 역할(포지션) 확인
- **담당 창고** - 취사병별 창고 담당 구역(정/부) 확인
- **조리 시 담당구역** - 조리 중 각 구역 담당자 확인

### 수정 기능 (권한 필요)
- **취사병 추가/삭제** - 인원 변동 관리
- **다음달 조리라인 관리** - 다음달 포지션 사전 배정
- **창고구역 관리** - 창고 담당 구역 수정

### 기타
- **PWA 설치 가이드** - Android/iOS 홈화면 설치 안내

---

## 프로젝트 구조

```
eaglesKp/
├── server.js              # Express 백엔드
├── Dockerfile
├── package.json
└── client/                # React 프론트엔드
    └── src/
        ├── App.js         # 라우터 설정
        ├── store.js       # Redux 상태관리
        ├── page/          # 페이지 컴포넌트
        │   ├── main.js        # 메인 (탭 컨테이너)
        │   ├── topBar.js      # 상단바 + 슬라이드 메뉴
        │   ├── cook.js        # 조리라인 탭
        │   ├── ra.js          # 담당창고 탭
        │   ├── role.js        # 조리담당구역 탭
        │   ├── permisson.js   # 권한 획득 페이지
        │   ├── userManagement.js  # 취사병 관리
        │   ├── nextCook.js    # 다음달 조리라인 관리
        │   ├── nextRa.js      # 창고구역 관리
        │   ├── group.js       # 조짜기 (예정)
        │   ├── date.js        # 날짜 컴포넌트
        │   └── redirectToChrome.js  # 크롬 리다이렉트
        └── css/           # 스타일 파일
```

---

## API 목록

### 조회
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/infoGet` | 취사병 목록 전체 조회 |
| GET | `/api/raGet` | 창고 구역 데이터 조회 |
| GET | `/api/roleGet` | 조리 담당구역 데이터 조회 |

### 수정
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/permissonChk` | 수정 권한 확인 |
| POST | `/api/infoUpdate` | 조리라인(cook) 일괄 업데이트 |
| POST | `/api/raUpdate` | 창고 담당(ra1st, ra2nd) 일괄 업데이트 |
| POST | `/api/dataUpdate` | RA 컬렉션 단건 업데이트 |
| POST | `/api/roleUpdate` | 담당구역 수정 |
| POST | `/api/rolePush` | 담당구역 추가 |
| POST | `/api/cookUpdate` | COOK 컬렉션 업데이트 |
| POST | `/api/cook/update` | 조리라인 일괄 업데이트 |

### 취사병 관리
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/user/add` | 취사병 추가 |
| DELETE | `/api/user/delete/:id` | 취사병 삭제 |

---

## MongoDB 컬렉션 구조

### `info` (취사병 정보)
```json
{
  "id": "202401",
  "name": "홍길동",
  "entryDate": "2024",
  "cook": "주조리",
  "ra1st": "A창고",
  "ra2nd": "B창고"
}
```

### `RA` (창고 관리)
```json
{ "구역": "A창고", ... }
```

### `Role` (조리 시 담당구역)
```json
{ "구역": "볶음구역", "담당": "홍길동" }
```

### `COOK` (조리라인)
```json
{ "역할": "주조리", "담당자": "홍길동" }
```

---

## 실행 방법

### 개발 환경

```bash
# 백엔드
npm install
npm start

# 프론트엔드
cd client
npm install
npm start
```

### 프로덕션 빌드

```bash
cd client
npm run build
cd ..
npm start
```

### Docker

```bash
docker build -t eagleskp .
docker run -p 3030:3030 eagleskp
```

---

## 배포

- **배포 URL:** https://port-0-eagleskp-m5dahxe3d1a3c3c2.sel4.cloudtype.app/
- cloudtype을 통해 Docker 컨테이너로 배포

