import type { Post } from "@repo/domain"
import type { Prettify } from "better-auth"
import type { Prisma } from "../generated/prisma/client"
import { prisma } from "../lib/prisma"

interface PostService {
  list: ({
    offset,
    limit,
  }: {
    offset?: number
    limit?: number
  }) => Promise<Post[]>
  create: (
    data: Prettify<Omit<Post, "id" | "createdAt" | "updatedAt" | "user">> & {
      userId: string
    },
  ) => Promise<Post>
  update: (
    data: Prettify<
      Partial<Omit<Post, "createdAt" | "updatedAt" | "user">> & Pick<Post, "id">
    > & {
      userId: string
    },
  ) => Promise<Post>
  delete: ({ id, userId }: { id: string; userId: string }) => Promise<Post>
  findById: ({ id }: { id: string }) => Promise<Post>
}

const prismaPostToPost = (
  post: Prisma.PostGetPayload<{
    include: {
      user: true
    }
  }>,
): Post => {
  if (!post) {
    throw new Error("Post not found")
  }
  return {
    id: post.id,
    title: post.title,
    description: post.description ?? undefined,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    user: post.user,
  }
}

export const postService: PostService = {
  list: async ({ offset, limit }) => {
    const posts = await prisma.post.findMany({
      skip: offset,
      take: limit,
      include: {
        user: true,
      },
    })
    return posts.map(prismaPostToPost)
  },
  create: async (data) => {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        description: data.description,
        userId: data.userId,
      },
      include: {
        user: true,
      },
    })
    return prismaPostToPost(post)
  },
  update: async (data) => {
    const post = await prisma.post.update({
      where: {
        id: data.id,
        userId: data.userId,
      },
      include: {
        user: true,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    })
    return prismaPostToPost(post)
  },
  delete: async (data) => {
    const post = await prisma.post.delete({
      where: {
        id: data.id,
        userId: data.userId,
      },
      include: {
        user: true,
      },
    })
    return prismaPostToPost(post)
  },
  findById: async (data) => {
    const post = await prisma.post.findUnique({
      where: {
        id: data.id,
      },
      include: {
        user: true,
      },
    })
    if (!post) {
      throw new Error("Post not found")
    }
    return prismaPostToPost(post)
  },
}
