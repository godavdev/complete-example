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
