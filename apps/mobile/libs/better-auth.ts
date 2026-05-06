import { expoClient } from "@better-auth/expo/client"
import { createAuthClient } from "better-auth/react"
import SecureStore from "expo-secure-store"

export const authClient = createAuthClient({
  baseURL: "http://localhost:8000/auth",
  plugins: [
    expoClient({
      scheme: "mobile",
      storagePrefix: "mobile",
      storage: SecureStore,
    }),
  ],
})
