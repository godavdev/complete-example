import type { User } from "../users/entities"

export interface Post {
  id: string
  title: string
  description?: string
  user: User
  createdAt: Date
  updatedAt: Date
}
