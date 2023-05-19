FROM node:18
WORKDIR /usr/src/intro-api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]
