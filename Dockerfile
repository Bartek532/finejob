FROM node:16-bullseye-slim AS base
# prisma deps for Apple Silicon
RUN apt-get update \
  && apt-get install -y \
  openssl \
  && rm -rf /var/lib/apt/lists/*
# copy files required to install dependencies
COPY apps/api/package.json /app/
# install all dependencies
WORKDIR /app
RUN npm i
# copy rest of the files
COPY . /app/

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

# build the app in production mode, generate prisma clien and prune devDependencies
RUN NODE_ENV=production npm run build:api \
  && npm prune --omit=dev \
  && npx -w backend prisma generate

FROM node:16-bullseye-slim AS backend
# set envs
ENV \
  NODE_ENV=production \
  TINI_VERSION=v0.19.0
# install tiny init - https://github.com/krallin/tini
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
# use non-root user
USER node
# copy files required to run the app
COPY --from=base --chown=node:node /app/node_modules /app/node_modules
COPY --from=base --chown=node:node /app/prisma /app/prisma
COPY --from=base --chown=node:node /app/dist /app/
COPY --from=base --chown=node:node /app/package.json /app/package.json
WORKDIR /app
ENTRYPOINT ["/tini", "--"]
# CMD ["node", "main.js"]
# ...run with migration
CMD npx prisma migrate deploy \
  && node index.js