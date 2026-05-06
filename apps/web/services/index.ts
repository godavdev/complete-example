import { initServices } from "@repo/shared"
export const services = initServices("http://localhost:8000", {
  fetch: {
    credentials: "include",
  },
})
export const {
  posts: postService,
  users: { findById: findUserByIdService },
} = services

export const {
  create: createPostService,
  list: listPostsService,
  delete: deletePostService,
} = postService
