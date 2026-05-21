import { appendFile } from "node:fs/promises"

const LOG_FILE = "logs.txt"

export const log = ({
  component,
  level,
  message,
  userId,
}: {
  level: "DEBUG" | "WARN" | "ERROR" | "INFO"
  component: string
  message: string
  userId?: string
}) => {
  const LOG = `${new Date().toISOString()}: [${level}] [${component}]${userId ? ` [User ID: ${userId}]` : ""} Message: ${message}`
  console.log(LOG)
  // biome-ignore lint/complexity/noVoid: <explanation>
  void appendFile(LOG_FILE, `${LOG}\n`)
}
