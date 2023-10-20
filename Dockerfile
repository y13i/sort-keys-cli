FROM node:21-alpine

COPY package.json package-lock.json ./
RUN npm ci
COPY bin/index.js ./

ENTRYPOINT ["node", "index.js"]
