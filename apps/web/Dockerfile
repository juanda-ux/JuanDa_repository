# syntax=docker/dockerfile:1.4
FROM node:18-alpine AS deps
WORKDIR /app
COPY ../../package.json ../../pnpm-workspace.yaml ./
COPY ../../packages ./packages
RUN corepack enable && pnpm install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ../../package.json ../../pnpm-workspace.yaml ./
COPY ../../packages ./packages
COPY . .
RUN corepack enable && pnpm build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json ./package.json
RUN corepack enable && pnpm install --prod --frozen-lockfile
CMD ["pnpm", "start"]
