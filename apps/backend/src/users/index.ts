import { Elysia } from "elysia"
import { authMacros } from "../auth/macros"
import { idParams } from "../utils/id-params"
import { paginationQuery } from "../utils/pagination-query"
import { userService } from "./service"

export const users = new Elysia({
  prefix: "/users",
})
  .use(authMacros)
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
