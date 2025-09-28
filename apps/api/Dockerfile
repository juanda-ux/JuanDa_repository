# syntax=docker/dockerfile:1.4
FROM node:18-alpine AS base
WORKDIR /app
COPY ../../package.json ../../pnpm-workspace.yaml ./
COPY ../../packages ./packages
RUN corepack enable && pnpm install --frozen-lockfile

FROM base AS build
COPY . .
RUN pnpm build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY package.json ./package.json
RUN corepack enable && pnpm install --prod --frozen-lockfile
CMD ["node", "dist/main.js"]
