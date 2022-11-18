FROM node:latest
MAINTAINER ptklorran
ENV NODE_ENV=production
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT npm run start
EXPOSE 3000
