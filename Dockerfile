#dockerfile for frenon test backend
FROM mhart/alpine-node

#define working directory
WORKDIR /usr/app

#copy build files
COPY package*.json ./

#install dependencies
RUN npm install

#copies the rest of the app
COPY . .

#exposes port 3001 outside the container

EXPOSE 3001

CMD npm start
