import { queryOptions } from "@tanstack/react-query"
import { getCurrentUser } from "./auth-services"

export const signInOptions = queryOptions({
  queryKey: [
    "auth",
  ],
  queryFn: getCurrentUser,
})
