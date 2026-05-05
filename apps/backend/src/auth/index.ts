import Elysia from "elysia"
import { auth as betterAuth } from "../lib/auth"

export const auth = new Elysia({
  name: "auth",
}).mount(betterAuth.handler)
