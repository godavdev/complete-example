import type { initServices } from "../services"
import { initPostsOptions } from "./posts-options"
import { initUsersOptions } from "./users-options"

export const initOptions = (services: ReturnType<typeof initServices>) =>
  ({
    posts: initPostsOptions(services.posts),
    users: initUsersOptions(services.users),
  }) as const
