FROM node:8
ARG API_URL

WORKDIR /tmp

ENV API_URL "$API_URL"
COPY . .
RUN npm install
RUN npm run build

# After compiling codes, coping only necessary files and remove others.
WORKDIR /usr/src/app

RUN cp /tmp/package.json . && \
    cp /tmp/production-server.js . && \
    cp -r /tmp/dist . && \
    rm -rf /tmp && \
    npm install --prod

EXPOSE 4000
CMD ["npm", "run", "serve-prod"]