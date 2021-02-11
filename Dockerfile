FROM node:14 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn add rimraf

RUN yarn

COPY . .

RUN yarn start:dev