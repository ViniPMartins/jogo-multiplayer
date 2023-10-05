FROM node:18-alpine

ARG PORT_BUILD=3000

ENV PORT=${PORT_BUILD}

EXPOSE ${PORT}

WORKDIR /game

COPY . .

RUN npm install

ENTRYPOINT npm start