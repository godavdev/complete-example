import { initServices } from "@repo/shared"

export const services = initServices("http://localhost:8000", {
  fetch: {
    credentials: "include",
  },
})
