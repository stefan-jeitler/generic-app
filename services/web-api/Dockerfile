FROM node:20
ARG APP_VERSION=0.0.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm version ${APP_VERSION}
RUN npm run build

CMD [ "npm", "run", "start" ]