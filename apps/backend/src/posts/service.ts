import type { Prettify } from "better-auth"
import type { Post as PrismaPost } from "../generated/prisma/client"
import { prisma } from "../lib/prisma"
import { NotFoundError } from "../utils/not-found-error"
import type { Post } from "./entities"

interface PostService {
  list: ({
    offset,
    limit,
  }: {
    offset?: number
    limit?: number
  }) => Promise<Post[]>
  create: (
    data: Prettify<Omit<Post, "id" | "createdAt" | "updatedAt">>,
  ) => Promise<Post>
  update: (
    data: Prettify<
      Partial<Omit<Post, "createdAt" | "updatedAt">> & Pick<Post, "id">
    >,
  ) => Promise<Post>
  delete: ({ id }: { id: string }) => Promise<Post>
  findById: ({ id }: { id: string }) => Promise<Post>
}

const prismaPostToPost = (post: PrismaPost) => {
  if (!post) {
    throw new Error("Post not found")
  }
  return {
    id: post.id,
    title: post.title,
    description: post.description ?? undefined,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }
}

export const postService: PostService = {
  list: async ({ offset, limit }) => {
    const posts = await prisma.post.findMany({
      skip: offset,
      take: limit,
    })
    return posts.map(prismaPostToPost)
  },
  create: async (data) => {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        description: data.description,
      },
    })
    return prismaPostToPost(post)
  },
  update: async (data) => {
    const post = await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    })
    return prismaPostToPost(post)
  },
  delete: async ({ id }) => {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    })
    return prismaPostToPost(post)
  },
  findById: async ({ id }) => {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    })
    if (!post) {
      throw new NotFoundError("Post not found")
    }
    return prismaPostToPost(post)
  },
}
