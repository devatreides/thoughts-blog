FROM node:15.8.0-alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app

COPY . /usr/src/app

EXPOSE 3000

CMD [ "yarn", "dev" ]