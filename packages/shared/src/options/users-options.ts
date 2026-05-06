import { queryOptions } from "@tanstack/react-query"
import type { getUsersService } from "../services/users"

export const USERS_KEY = "users"

export const initUsersOptions = (service: ReturnType<typeof getUsersService>) =>
  ({
    findById: ({ id }: { id: string }) =>
      queryOptions({
        queryKey: [
          USERS_KEY,
          id,
        ],
        queryFn: async () =>
          await service.findById({
            id,
          }),
      }),
  }) as const
