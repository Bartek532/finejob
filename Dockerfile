FROM node:16-bullseye-slim AS base
RUN apt-get update \
  && apt-get install -y \
  openssl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json /app/
COPY apps/api/package*.json /app/apps/api/
COPY apps/frontend/package*.json /app/apps/frontend/
COPY packages/types/package*.json /app/packages/types/
RUN npm i
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

RUN npm run build \
  && npm prune --omit=dev

FROM node:16-bullseye-slim AS backend

ENV \
  NODE_ENV=production \
  TINI_VERSION=v0.19.0

ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

USER node

COPY --from=base --chown=node:node /app/node_modules /app/node_modules
COPY --from=base --chown=node:node /app/apps/api/prisma /app/prisma
COPY --from=base --chown=node:node /app/apps/api/dist /app/dist
COPY --from=base --chown=node:node /app/apps/api/package.json /app/package.json

WORKDIR /app
ENTRYPOINT ["/tini", "--"]

CMD ["node", "dist/index.js"]