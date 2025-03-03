FROM node:22.12.0-alpine

WORKDIR /app

RUN npm install -g ganache

EXPOSE 8545

CMD [ "ganache", "--wallet.mnemonic", "Jonathan Joseph Jotaro Josuke Giorno Jolyne Johnny Gyro Diego Will Caesar Polnareff", "--host", "0.0.0.0" ]