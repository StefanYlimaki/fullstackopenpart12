FROM node:16

WORKDIR /app

COPY --chown=node:node . .

RUN npm ci --only=production

ENV DEBUG=todo-backend:*

USER node

CMD npm start