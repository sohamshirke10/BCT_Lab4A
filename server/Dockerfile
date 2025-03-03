FROM node:22.12.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN adduser -S -u 1001 -G users josuke

COPY . .

RUN chown -R josuke:users /app

USER josuke

EXPOSE 4000

CMD ["node","index.js"]