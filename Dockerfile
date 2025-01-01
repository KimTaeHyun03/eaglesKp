FROM node:18

# 작업 디렉터리 설정
WORKDIR /app

# 서버 종속성 설치 (캐싱 최적화)
COPY package.json package-lock.json ./
RUN npm install

# 클라이언트 의존성 설치 및 빌드 (캐싱 최적화)
COPY client/package.json client/package-lock.json ./client/
RUN npm install --prefix client
COPY client ./client
RUN npm run build --prefix client

# 나머지 서버 코드 복사
COPY . .

# 포트 설정
EXPOSE 3030

# 서버 실행
CMD ["node", "server.js"]