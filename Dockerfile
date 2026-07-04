# syntax=docker/dockerfile:1

# `next build` needs devDependencies (typescript, eslint, tailwindcss - the
# latter is required by app/lib/fonts.ts's next/font/google PostCSS pipeline
# even though Tailwind isn't otherwise imported at runtime), so it must run
# with a full `npm ci` in its own stage. The final runtime stage then
# reinstalls with `npm ci --omit=dev` so the shipped image only carries
# production dependencies.
FROM node:20-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
# Cloud Run requires the container to listen on the port it injects via the
# PORT env var (8080 by default), but server.js reads APP_PORT - so this
# must match the container_port configured on the Cloud Run service in
# terraform/.
ENV APP_PORT=8080

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY server.js next.config.mjs ./

RUN chown -R node:node /app

USER node

EXPOSE 8080

CMD ["node", "server.js"]
