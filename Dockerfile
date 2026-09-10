FROM node:24.21.0-slim@sha256:2fe369e969550cde8e867afc3fe370b260140cab4a23d467074295b42163d553

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
COPY bin/index.js ./

ENTRYPOINT ["node", "index.js"]
