FROM ubuntu:20.04

RUN \
  apt-get update && \
  apt-get install -y software-properties-common && \
  apt-get install -y wget make curl git 

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs

RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

VOLUME /var/www

WORKDIR /var/www/html

EXPOSE 3000


ADD ./package.json ./yarn.*
RUN yarn install

