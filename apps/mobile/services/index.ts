import { initServices } from "@repo/shared"
import { authClient } from "@/libs/better-auth"
import { apiUrl } from "../utils/api-url"

export const services = initServices(apiUrl, {
  fetch: {
    credentials: "omit",
  },
  headers: {
    Cookie: authClient.getCookie(),
  },
})
