import { api } from "@/lib/elysia"

export const createPostService = async ({
  title,
  description,
}: Parameters<typeof api.posts.post>[0]) => {
  const { data, error } = await api.posts.post({
    title,
    description,
  })
  if (error) {
    throw new Error("Failed to create post")
  }
  return data
}

export const listPostsService = async ({ offset, limit }: any) => {
  const { data, error } = await api.posts.get({
    query: {
      limit,
      offset,
    },
  })
  if (error) {
    throw new Error("Failed to list posts")
  }
  return data ?? []
}

export const getPostByIdService = async ({
  id,
}: any) => {
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

export const updatePostService = async ({
  id,
  title,
  description,
}: any) => {
  const { data, error } = await api
    .posts({
      id,
    })
    .patch({
      title,
      description,
    })
  if (error) {
    throw new Error("Failed to update post")
  }
  return data
}

export const deletePostService = async ({
  id,
}: any) => {
  const { data, error } = await api
    .posts({
      id,
    })
    .delete({
      id,
    })
  if (error) {
    throw new Error("Failed to delete post")
  }
  return data
}
