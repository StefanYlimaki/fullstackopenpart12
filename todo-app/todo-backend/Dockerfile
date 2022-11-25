FROM node:16

USER node

WORKDIR /app

COPY --chown=node:node . .

RUN npm ci

CMD npm start