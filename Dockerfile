FROM node:24.17.0-slim@sha256:862263c612aa437e3037674b85419622a9d93bff80aa1eee5398dfe686375532

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
COPY bin/index.js ./

ENTRYPOINT ["node", "index.js"]
