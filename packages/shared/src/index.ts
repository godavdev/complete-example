import { treaty } from "@elysia/eden"
import type { App } from "../../../apps/backend/src"
import { getPostsService } from "./posts"
import type { ApiParams } from "./types"
import { getUsersService } from "./users"

export const getServices = (...params: ApiParams) => {
  const api = treaty<App>(...params)
  return {
    posts: getPostsService(api),
    users: getUsersService(api),
  } as const
}
