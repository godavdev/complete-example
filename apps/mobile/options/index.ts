import { initOptions } from "@repo/shared"
import { services } from "@/services"
export const {
  posts: {
    create: createPostOptions,
    list: listPostsOptions,
    delete: deletePostOptions,
  },
  users: { findById: findUserByIdOptions },
} = initOptions(services)
