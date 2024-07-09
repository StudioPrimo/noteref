FROM node:20.9.0

WORKDIR /app/src

COPY ./src/package*.json ./

RUN npm install

COPY . .
EXPOSE 3000