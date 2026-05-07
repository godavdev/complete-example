import { Elysia } from "elysia"
import { auth } from "../lib/auth"

export const authMacros = new Elysia({
  name: "authMacros",
}).macro({
  withAuth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      })

      if (!session) {
        return status(401)
      }

      return {
        user: session.user,
        session: session.session,
      }
    },
  },
})
