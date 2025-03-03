FROM node:22.12.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN adduser -S -u 1001 -G users josuke

COPY . .

RUN chown -R josuke:users /app

USER josuke

EXPOSE 5173

CMD ["npm", "run", "dev"]
