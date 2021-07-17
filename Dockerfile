 FROM node:14-alpine

 COPY . /usr/app
 WORKDIR /usr/app

 RUN yarn install
 RUN yarn build

 CMD ["yarn", "start"]
