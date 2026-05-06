import { Elysia } from "elysia"
import { authMacros } from "../auth/macros"
import { idParams } from "../utils/id-params"
import { userService } from "./service"

export const users = new Elysia({
  prefix: "/users",
})
  .use(authMacros)
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
