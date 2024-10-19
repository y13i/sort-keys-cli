FROM node:22.10.0-slim⁠

COPY package.json package-lock.json ./
RUN npm ci
COPY bin/index.js ./

ENTRYPOINT ["node", "index.js"]
