FROM node:9-alpine

MAINTAINER Ilya Zolotukhin "ilyazolotukhin@donesafe.com"

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 4000

CMD ["yarn", "start"]
