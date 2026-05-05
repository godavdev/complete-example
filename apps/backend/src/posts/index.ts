import { Elysia, t } from "elysia"
import { authMacros } from "../auth/macros"
import { idParams } from "../utils/id-params"
import { NotFoundError } from "../utils/not-found-error"
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
  .onError(({ error, status }) => {
    if (error instanceof NotFoundError) {
      return status(404)
    }
    throw error
  })
  .post("/", async ({ body }) => await postService.create(body), {
    body: createPostBody,
    withAuth: true,
  })
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
    async ({ body, params: { id } }) =>
      await postService.update({
        id,
        ...body,
      }),
    {
      body: updatePostBody,
      params: idParams,
      withAuth: true,
    },
  )
  .delete(
    "/:id",
    async ({ params: { id } }) =>
      await postService.delete({
        id,
      }),
    {
      params: idParams,
      withAuth: true,
    },
  )
