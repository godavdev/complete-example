import { treaty } from "@elysia/eden"
import type { App } from "../../backend/src"

export const api = treaty<App>("localhost:3000")
