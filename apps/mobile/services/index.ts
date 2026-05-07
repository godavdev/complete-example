import { initServices } from "@repo/shared"
import { authClient } from "@/libs/better-auth"
import { apiUrl } from "../utils/api-url"

export const services = initServices(apiUrl, {
  fetch: {
    credentials: "omit",
  },
  onRequest: () => {
    const cookie = authClient.getCookie()
    return {
      headers: {
        Cookie: cookie,
      },
    }
  },
})
