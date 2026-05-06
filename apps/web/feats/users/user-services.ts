import { api } from "@/lib/elysia"

export const listUsersService = async ({ offset, limit }: any) => {
  const { data, error } = await api.users.get({
    query: {
      offset,
      limit,
    },
  })
  if (error) {
    throw new Error("Failed to list users")
  }
  return data ?? []
}

export const getUserByIdService = async ({ id }: any) => {
  const { data, error } = await api
    .users({
      id,
    })
    .get()
  if (error) {
    throw new Error("Failed to get user")
  }
  return data
}
