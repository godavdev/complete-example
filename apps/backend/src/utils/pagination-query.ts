import { t } from "elysia"

export const paginationQuery = t.Object({
  offset: t.Optional(t.Number({})),
  limit: t.Optional(t.Number({})),
})
