# 개발 환경을 위한 Dockerfile
FROM node:23-alpine

# 필요한 기본 패키지 설치
RUN apk add --no-cache libc6-compat

# 작업 디렉토리 설정
WORKDIR /app

# yarn 캐시 설정
ENV YARN_CACHE_FOLDER=/root/.yarn-cache

# package.json과 yarn.lock 복사
COPY package.json yarn.lock ./

# 개발 의존성을 포함한 모든 의존성 설치
RUN yarn install

# 소스 코드 복사
COPY . .

# 포트 설정 (Next.js 기본 개발 포트)
EXPOSE 3000

# 개발 서버 실행
CMD ["yarn", "dev"]