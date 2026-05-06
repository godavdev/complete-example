import { mutationOptions } from "@tanstack/react-query"
import { signIn, signOut, signUp } from "./auth-services"

export const signInOptions = mutationOptions({
  mutationKey: [
    "auth",
    "sign-in",
  ],
  mutationFn: signIn,
})

export const signUpOptions = mutationOptions({
  mutationKey: [
    "auth",
    "sign-up",
  ],
  mutationFn: signUp,
  onSuccess: async () => {
    reva
  },
})

export const signOutOptions = mutationOptions({
  mutationKey: [
    "auth",
    "sign-out",
  ],
  mutationFn: signOut,
})
