FROM oven/bun AS build

WORKDIR /app

COPY package.json package.json
COPY bun.lock bun.lock
COPY apps/backend/package.json ./apps/backend/package.json
COPY packages/domain/package.json ./packages/domain/package.json

RUN bun install --ignore-scripts

COPY apps/backend ./apps/backend

ENV NODE_ENV=production
ENV DATABASE_URL=file:./dev.db
ENV PORT=8000
ENV BETTER_AUTH_URL=http://localhost:${PORT}
ENV BETTER_AUTH_SECRET=1mxE4jT0Mp8h80jGjz4i7HrRfm4XCPok

RUN bun run --cwd apps/backend db:reset

RUN bun build \
  --compile \
  --minify-whitespace \
  --minify-syntax \
  --outfile server \
  apps/backend/src/index.ts

## El segundo stage es para la imagen final, que es más ligera
FROM gcr.io/distroless/cc-debian12

WORKDIR /app

COPY --from=build /app/server server
COPY --from=build /app/apps/backend/dev.db dev.db
COPY --from=build /app/node_modules/@libsql node_modules/@libsql

ENV NODE_ENV=production
ENV DATABASE_URL=file:./dev.db
ENV PORT=8000
ENV BETTER_AUTH_URL=http://localhost:${PORT}
ENV BETTER_AUTH_SECRET=1mxE4jT0Mp8h80jGjz4i7HrRfm4XCPok

CMD [ "./server" ]

EXPOSE ${PORT}