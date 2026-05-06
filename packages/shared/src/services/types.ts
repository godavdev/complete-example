import type { treaty } from "@elysia/eden"
import type { App } from "../../../../apps/backend/src"

export type Api = ReturnType<typeof treaty<App>>
export type ApiParams = Parameters<typeof treaty<App>>
