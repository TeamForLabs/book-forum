FROM node:latest 

WORKDIR /usr/bookForum/

COPY . .
RUN npm install

EXPOSE 4200

CMD /usr/bookForum/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck

