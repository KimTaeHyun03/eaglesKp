FROM node:18

# 작업 디렉터리 설정
WORKDIR /app

# 서버 종속성 설치
COPY package.json package-lock.json ./
RUN npm install

# 클라이언트 빌드
COPY client ./client
RUN npm install --prefix client && npm run build --prefix client

# 클라이언트 빌드 결과를 서버에서 제공
COPY client/build ./client/build

# 서버 코드 복사
COPY . .

# 포트 설정
EXPOSE 3030

# 서버 실행
CMD ["node", "server.js"]
