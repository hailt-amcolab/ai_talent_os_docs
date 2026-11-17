FROM node:22.20-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS build
COPY tsconfig.json prisma.config.ts ./
COPY prisma ./prisma
COPY certs ./certs
COPY src ./src
RUN npm run build

# One-shot Prisma CLI image; migration credentials never enter an image layer.
FROM build AS migration
ENV NODE_ENV=production
USER node
CMD ["npm", "run", "db:migrate"]

FROM build AS production-dependencies
RUN npm prune --omit=dev

FROM node:22.20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --chown=node:node certs ./certs
COPY --chown=node:node package.json ecosystem.config.cjs ./
USER node
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD wget -qO- http://127.0.0.1:8080/health || exit 1
CMD ["node_modules/.bin/pm2-runtime", "ecosystem.config.cjs"]
