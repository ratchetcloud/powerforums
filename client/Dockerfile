FROM node:8
ARG API_URL

WORKDIR /usr/src/app

ENV API_URL "$API_URL"
COPY . .
RUN npm install
RUN npm run build

EXPOSE 4000
CMD node production-server