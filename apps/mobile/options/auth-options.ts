import {
  type MutationOptions,
  mutationOptions,
  type QueryClient,
  queryOptions,
} from "@tanstack/react-query"
import { getSession, signIn, signOut, signUp } from "@/services/auth-service"

export const AUTH_KEY = "auth"

export const getCurrentUserOptions = queryOptions({
  queryKey: [
    AUTH_KEY,
  ],
  queryFn: async () => await getSession(),
})

export const signInOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationKey: [
      AUTH_KEY,
      "sign-in",
    ],
    mutationFn: signIn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          AUTH_KEY,
        ],
      })
    },
  })

export const signUpOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationKey: [
      AUTH_KEY,
      "sign-up",
    ],
    mutationFn: signUp,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          AUTH_KEY,
        ],
      })
    },
  })

export const signOutOptions = (queryClient: QueryClient): MutationOptions => ({
  mutationKey: [
    AUTH_KEY,
    "sign-out",
  ],
  mutationFn: signOut,
  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        AUTH_KEY,
      ],
    })
  },
})
