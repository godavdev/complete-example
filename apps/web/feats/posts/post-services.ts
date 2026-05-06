import { api } from "@/lib/elysia"

export const createPostService = async ({
  title,
  description,
}: {
  title: string
  description?: string
}) => {
  const { data, error } = await api.posts.post({
    title,
    description,
  })
  if (error) {
    throw new Error("Failed to create post")
  }
  return data
}

export const listPostsService = async ({
  offset,
  limit,
  userId,
}: {
  offset?: number
  limit?: number
  userId?: string
}) => {
  const { data, error } = await api.posts.get({
    query: {
      limit,
      offset,
      userId,
    },
  })
  if (error) {
    throw new Error("Failed to list posts")
  }
  return data ?? []
}

export const getPostByIdService = async ({ id }: { id: string }) => {
  const { data, error } = await api
    .posts({
      id,
    })
    .get()
  if (error) {
    throw new Error("Failed to get post")
  }
  return data
}

export const deletePostService = async ({ id }: { id: string }) => {
  const { data, error } = await api
    .posts({
      id,
    })
    .delete()
  if (error) {
    console.log("Failed to delete post - error:", error)
    throw new Error("Failed to delete post")
  }
  return data
}
