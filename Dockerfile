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

# NEXT_PUBLIC_* vars are inlined into the client bundle at `next build` time,
# so they must be supplied here as build args - setting them as Container App
# env vars later (terraform/container_app.tf) would have no effect on
# already-built output. ALLOWED_ORIGIN and WP_DOMAIN are read the same way by
# next.config.mjs's headers()/images.remotePatterns, so they need the same
# treatment even though they lack the NEXT_PUBLIC_ prefix.
ARG NEXT_PUBLIC_BLOG_NAME
ARG NEXT_PUBLIC_BLOG_DESCRIPTION
ARG NEXT_PUBLIC_BLOG_URL
ARG ALLOWED_ORIGIN
ARG WP_DOMAIN
ENV NEXT_PUBLIC_BLOG_NAME=${NEXT_PUBLIC_BLOG_NAME}
ENV NEXT_PUBLIC_BLOG_DESCRIPTION=${NEXT_PUBLIC_BLOG_DESCRIPTION}
ENV NEXT_PUBLIC_BLOG_URL=${NEXT_PUBLIC_BLOG_URL}
ENV ALLOWED_ORIGIN=${ALLOWED_ORIGIN}
ENV WP_DOMAIN=${WP_DOMAIN}

COPY . .
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
# Azure Container Apps has no injected PORT convention - it just proxies to
# whatever ingress.target_port is configured on the Container App, so this
# must match the target_port configured in terraform/container_app.tf.
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
