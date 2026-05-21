import { Elysia } from "elysia"
import { auth } from "../lib/auth"
import { log } from "../utils/log"

export const authMacros = new Elysia({
  name: "authMacros",
}).macro({
  withAuth: {
    async resolve({ status, request: { headers } }) {
      log({
        component: "AUTH_MACROS",
        level: "INFO",
        message: "Checking authentication for request",
      })
      const session = await auth.api.getSession({
        headers,
      })

      if (!session) {
        return status(401)
      }

      log({
        component: "AUTH_MACROS",
        level: "INFO",
        message: "Authentication successful for user",
        userId: session.user.id,
      })

      return {
        user: session.user,
        session: session.session,
      }
    },
  },
})
