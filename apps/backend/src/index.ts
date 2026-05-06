import { cors } from "@elysiajs/cors"
import { Elysia } from "elysia"
import { auth } from "./auth"
import { posts } from "./posts"
import { users } from "./users"

const app = new Elysia()
  .use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:8081",
        "mobile://*",
        "exp://**",
      ],
      credentials: true,
    }),
  )
  .use(auth)
  .use(posts)
  .use(users)
  .listen(process.env.PORT ?? 3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)

// For threaty
export type App = typeof app
