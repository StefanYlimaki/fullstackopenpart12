FROM node:16 AS test-stage
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN CI=true npm test
FROM test-stage AS build-stage
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "build"]
