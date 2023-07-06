FROM node:13.14.0

COPY . /app
WORKDIR /app

RUN npm install

ENTRYPOINT [ "node", "run.js" ]
