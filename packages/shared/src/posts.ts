import { UnauthorizedError, ValidationError } from "./errors"
import type { Api } from "./types"

export const getPostsService = (api: Api) =>
  ({
    create: async ({
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
        switch (error.status) {
          case 401:
            throw new UnauthorizedError(error.value)
          case 422:
            throw new ValidationError(JSON.stringify(error.value))
          default:
            throw new Error("An unexpected error occurred")
        }
      }
      return data
    },
    list: async ({
      limit,
      offset,
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
        switch (error.status) {
          case 401:
            throw new UnauthorizedError(error.value)
          case 422:
            throw new ValidationError(JSON.stringify(error.value))
          default:
            throw new Error("An unexpected error occurred")
        }
      }
      return data
    },
    findById: async ({ id }: { id: string }) => {
      const { data, error } = await api
        .posts({
          id,
        })
        .get()
      if (error) {
        switch (error.status) {
          case 401:
            throw new UnauthorizedError(error.value)
          case 422:
            throw new ValidationError(JSON.stringify(error.value))
          default:
            throw new Error("An unexpected error occurred")
        }
      }
      return data
    },
    delete: async ({ id }: { id: string }) => {
      const { data, error } = await api
        .posts({
          id,
        })
        .delete()
      if (error) {
        switch (error.status) {
          case 401:
            throw new UnauthorizedError(error.value)
          case 422:
            throw new ValidationError(JSON.stringify(error.value))
          default:
            throw new Error("An unexpected error occurred")
        }
      }
      return data
    },
  }) as const
