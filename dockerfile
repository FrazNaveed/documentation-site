FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache bash curl

COPY package.json package-lock.json ./
# Omit --production flag for TypeScript devDependencies
RUN npm ci --legacy-peer-deps

COPY src ./src
COPY migrations ./migrations
COPY public ./public
COPY next.config.mjs payload.config.ts payload-types.ts tsconfig.json .eslintrc.json .stylelintrc ./

# Environment variables must be present at build time
ARG POSTGRES_URL
ENV POSTGRES_URL=${POSTGRES_URL}
ARG PAYLOAD_SECRET
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_TELEMETRY_DISABLED 1
ENV DEPLOY_ENV docker

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs nextjs

RUN chown -R nextjs:nodejs /app

USER nextjs


COPY ./docker/entrypoint.d/ /docker-entrypoint.d
COPY ./docker/entrypoint.sh /docker-entrypoint.sh

WORKDIR /runtime
EXPOSE 3000
ENV HOSTNAME=0.0.0.0
HEALTHCHECK --start-period=60s --interval=15s --timeout=2s \
    CMD curl -f http://localhost:3000 || exit 1
ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD ["node", "server.js"]

# CMD sleep 900