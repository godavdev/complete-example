import { initOptions } from "@repo/shared"
import { postService } from "@/services"
export const {
  create: createPostOptions,
  list: listPostsOptions,
  delete: deletePostOptions,
} = initOptions.posts(postService)
