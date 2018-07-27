FROM node:8
WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm build

EXPOSE 4000
CMD node production-server