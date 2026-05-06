import { initServices } from "@repo/shared"
export const {
  posts: postService,
  users: { findById: findUserByIdService },
} = initServices("http://localhost:8000", {
  fetch: {
    credentials: "include",
  },
})

export const {
  create: createPostService,
  list: listPostsService,
  delete: deletePostService,
} = postService
