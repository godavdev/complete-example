import { getServices } from "@repo/shared"
export const {
  posts: {
    create: createPostService,
    list: listPostsService,
    delete: deletePostService,
  },
  users: { findById: findUserByIdService },
} = getServices("http://localhost:8000", {
  fetch: {
    credentials: "include",
  },
})
