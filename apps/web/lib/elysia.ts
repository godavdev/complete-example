"use client"
import { treaty } from "@elysia/eden"
import type { App } from "../../backend/src"

export const api = treaty<App>("localhost:8000", {
  fetch: {
    credentials: "include",
  },
})
