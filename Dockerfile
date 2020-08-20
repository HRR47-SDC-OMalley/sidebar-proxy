FROM node:12-alpine

WORKDIR /reburke-proxy-one
COPY package*.json ./
RUN npm install --production

EXPOSE 3000

COPY . .

CMD [ "npm", "start" ]
