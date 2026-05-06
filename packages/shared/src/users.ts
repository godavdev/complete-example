import { UnauthorizedError, ValidationError } from "./errors"
import type { Api } from "./types"

export const getUsersService = (api: Api) =>
  ({
    findById: async ({ id }: { id: string }) => {
      const { data, error } = await api
        .users({
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
  }) as const
