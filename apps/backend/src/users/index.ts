import { Elysia } from "elysia"
import { authMacros } from "../auth/macros"
import { idParams } from "../utils/id-params"
import { NotFoundError } from "../utils/not-found-error"
import { paginationQuery } from "../utils/pagination-query"
import { userService } from "./service"

export const users = new Elysia({
  prefix: "/users",
})
  .use(authMacros)
  .onError(({ error, status }) => {
    if (error instanceof NotFoundError) {
      return status(404)
    }
    throw error
  })
  .get("/", async ({ query }) => await userService.list(query), {
    query: paginationQuery,
    withAuth: true,
  })
  .get(
    "/:id",
    async ({ params: { id } }) =>
      await userService.findById({
        id,
      }),
    {
      params: idParams,
      withAuth: true,
    },
  )
