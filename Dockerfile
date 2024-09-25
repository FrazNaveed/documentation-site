FROM node:22-alpine AS base

# Source code and deps. Cached layer.
FROM base AS builder

WORKDIR /app

COPY package.json package-lock.json ./
# Omit --production flag for TypeScript devDependencies
RUN npm ci --legacy-peer-deps

COPY src ./src
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .

# Environment variables must be present at build time
ARG POSTGRES_URL
ENV POSTGRES_URL=${POSTGRES_URL}
ARG PAYLOAD_SECRET
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ENV POSTGRES_URL=${POSTGRES_URL}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]