import type { User as PrismaUser } from "../generated/prisma/client"
import { prisma } from "../lib/prisma"
import type { User } from "./entities"

interface UserService {
  list: ({
    offset,
    limit,
  }: {
    offset?: number
    limit?: number
  }) => Promise<User[]>
  findById: ({ id }: { id: string }) => Promise<User>
}

const prismaUserToUser = (user: PrismaUser) => {
  if (!user) {
    throw new Error("User not found")
  }
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export const userService: UserService = {
  list: async ({ offset, limit }) => {
    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
    })
    return users.map(prismaUserToUser)
  },
  findById: async ({ id }) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) {
      throw new Error("User not found")
    }
    return prismaUserToUser(user)
  },
}
