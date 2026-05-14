import { initServices } from "@repo/shared"

export const services = initServices(
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000",
  {
    fetch: {
      credentials: "include",
    },
  },
)
