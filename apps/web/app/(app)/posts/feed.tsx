"use client"

import { useQuery } from "@tanstack/react-query"
import { listPostsService } from "@/feats/posts/post-services"
import { PostCard } from "./post-card"

// import { PostCard } from "./post-card"

export const PostsFeed = ({ userId }: { userId?: string } = {}) => {
  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryKey: [
      "posts",
      userId,
    ],
    queryFn: async () => {
      const res = await listPostsService({
        userId,
      })
      return res
    },
  })

  if (error) {
    return null
  }

  if (isPending) {
    return null
  }
  return (
    <div className="flex flex-col gap-4">
      {isPending && (
        <div className="text-center text-muted-foreground text-sm">
          Loading posts...
        </div>
      )}
      {error && (
        <div className="text-center text-destructive text-sm">
          Failed to load posts
        </div>
      )}

      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}

      {posts?.length === 0 && !isPending && (
        <div className="text-center text-muted-foreground text-sm">
          No posts yet. Be the first to post!
        </div>
      )}
    </div>
  )
}
