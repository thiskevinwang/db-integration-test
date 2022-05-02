# https://blog.logrocket.com/containerized-development-nestjs-docker/

FROM node:16-alpine AS BUILDER

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:16-alpine as TEST

ARG NODE_ENV=test
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

COPY --from=BUILDER /usr/src/app/ ./

CMD ["npm", "rum", "test"]