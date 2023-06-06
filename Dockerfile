FROM node:14.18.1-alpine

WORKDIR /usr/src/app
COPY package.json /usr/src/app/

RUN npm install
COPY ./ /usr/src/app/
RUN npm run build

CMD [ "node", "build/index.js" ]