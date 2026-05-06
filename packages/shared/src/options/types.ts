import type { mutationOptions, QueryClient } from "@tanstack/react-query"

export type MutateAndInvalidateOptions = {
  queryClient: QueryClient
  preventInvalidation?: boolean
} & Parameters<typeof mutationOptions>[0]
