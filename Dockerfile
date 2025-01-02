# Node.js 환경 설정
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 환경 변수 설정
ENV ANDROID_HOME=/usr/local/android-sdk
ENV PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH

# 필수 도구 및 Bubblewrap 설치
RUN apt-get update && apt-get install -y openjdk-17 wget unzip && \
    npm install -g @bubblewrap/cli

# 서버 종속성 설치
COPY package.json package-lock.json ./
RUN npm install

# 빌드된 클라이언트 복사
COPY client/build ./client/build

# 나머지 서버 코드 복사
COPY . .

# Bubblewrap 초기화 및 빌드 실행
RUN bubblewrap init --url "https://your-pwa-url.com" --skipPrompt && \
    bubblewrap build

# APK 파일 위치를 공유 디렉토리로 설정
VOLUME /app/build/outputs/apk/

# 포트 설정
EXPOSE 3030

# 서버 실행
CMD ["node", "server.js"]