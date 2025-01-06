# Node.js 환경 설정
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 서버 종속성 설치
COPY package.json package-lock.json ./
RUN npm install

# 빌드된 클라이언트 복사
COPY client/build ./client/build

# 나머지 서버 코드 복사
COPY . .

# 포트 설정
EXPOSE 3030

# 서버 실행
CMD ["node", "server.js"]