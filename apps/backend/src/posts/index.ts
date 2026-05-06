import { Elysia, t } from "elysia"
import { authMacros } from "../auth/macros"
import { idParams } from "../utils/id-params"
import { paginationQuery } from "../utils/pagination-query"
import { postService } from "./service"

const createPostBody = t.Object({
  title: t.String(),
  description: t.Optional(t.String()),
})

const updatePostBody = t.Object({
  title: t.Optional(t.String()),
  description: t.Optional(t.String()),
})

export const posts = new Elysia({
  prefix: "/posts",
})
  .use(authMacros)
  .post(
    "/",
    async ({ body, user }) =>
      await postService.create({
        ...body,
        userId: user.id,
      }),
    {
      body: createPostBody,
      withAuth: true,
    },
  )
  .get("/", async ({ query }) => await postService.list(query), {
    query: paginationQuery,
    withAuth: true,
  })
  .get(
    "/:id",
    async ({ params: { id } }) =>
      await postService.findById({
        id,
      }),
    {
      params: idParams,
      withAuth: true,
    },
  )
  .patch(
    "/:id",
    async ({ body, params: { id }, user }) =>
      await postService.update({
        id,
        ...body,
        userId: user.id,
      }),
    {
      body: updatePostBody,
      params: idParams,
      withAuth: true,
    },
  )
  .delete(
    "/:id",
    async ({ params: { id }, user }) =>
      await postService.delete({
        id,
        userId: user.id,
      }),
    {
      params: idParams,
      withAuth: true,
    },
  )
