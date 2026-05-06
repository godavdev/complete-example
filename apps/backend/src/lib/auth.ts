import { expo } from "@better-auth/expo"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    expo(),
  ],
  basePath: "/",
  trustedOrigins: [
    "http://localhost:3000",
    "mobile://*",
    "exp://**",
    "http://localhost:8081",
  ],
})
