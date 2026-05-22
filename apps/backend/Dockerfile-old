FROM oven/bun

WORKDIR /app

ENV NODE_ENV=production
ENV DATABASE_URL=file:/app/apps/backend/dev.db
ENV PORT=8000
ENV BETTER_AUTH_URL=http://localhost:${PORT}
ENV BETTER_AUTH_SECRET=1mxE4jT0Mp8h80jGjz4i7HrRfm4XCPok

COPY package.json package.json
COPY bun.lock bun.lock

COPY apps/backend ./apps/backend
COPY packages/domain ./packages/domain

RUN bun install
RUN bun run --cwd apps/backend db:reset

CMD [ "bun", "run", "apps/backend/src/index.ts" ]

EXPOSE ${PORT}