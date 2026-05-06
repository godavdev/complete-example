/** biome-ignore-all lint/performance/noNamespaceImport: <explanation> */

import { expoClient } from "@better-auth/expo/client"
import { createAuthClient } from "better-auth/react"
import * as SecureStore from "expo-secure-store"
import { apiUrl } from "@/utils/api-url"

export const authClient = createAuthClient({
  baseURL: `${apiUrl}/auth`,
  plugins: [
    expoClient({
      scheme: "mobile",
      storagePrefix: "mobile",
      storage: SecureStore,
    }),
  ],
})
