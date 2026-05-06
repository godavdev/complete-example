import { mutationOptions, queryOptions } from "@tanstack/react-query"
import type { getPostsService } from "../services/posts"
import type { MutateAndInvalidateOptions } from "./types"

export const POSTS_KEY = "posts"

export const initPostsOptions = (
  postsService: ReturnType<typeof getPostsService>,
) =>
  ({
    create: ({
      queryClient,
      preventInvalidation,
      onSuccess,
      mutationFn,
      ...options
    }: MutateAndInvalidateOptions) =>
      mutationOptions({
        mutationFn: postsService.create,
        mutationKey: [
          POSTS_KEY,
          "create",
        ],
        onSuccess: async (...params) => {
          if (!preventInvalidation) {
            await queryClient.invalidateQueries({
              queryKey: [
                POSTS_KEY,
              ],
            })
          }
          await onSuccess?.(...params)
        },
        ...options,
      }),
    delete: ({
      queryClient,
      preventInvalidation,
      onSuccess,
      mutationFn,
      ...options
    }: MutateAndInvalidateOptions) =>
      mutationOptions({
        mutationFn: postsService.delete,
        mutationKey: [
          POSTS_KEY,
          "create",
        ],
        onSuccess: async (...params) => {
          if (!preventInvalidation) {
            await queryClient.invalidateQueries({
              queryKey: [
                POSTS_KEY,
              ],
            })
          }
          await onSuccess?.(...params)
        },
        ...options,
      }),
    list: ({ userId }: { userId?: string }) =>
      queryOptions({
        queryKey: [
          POSTS_KEY,
          userId,
        ],
        queryFn: async () =>
          postsService.list({
            userId,
          }),
      }),
  }) as const
