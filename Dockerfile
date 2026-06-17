# 1단계: React 클라이언트 빌드
FROM node:22-slim AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# 2단계: 서버 실행
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
# 1단계에서 만든 빌드 결과물 가져오기
COPY --from=client-build /app/client/build ./client/build
EXPOSE 3030
CMD ["node", "server.js"]