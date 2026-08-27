FROM node:24-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json

RUN pnpm install --frozen-lockfile

COPY apps/web apps/web

WORKDIR /app/apps/web

CMD ["pnpm", "dev", "--host", "0.0.0.0"]