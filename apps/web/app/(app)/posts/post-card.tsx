"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getCurrentUser } from "@/feats/auth/auth-services"
import { deletePostOptions } from "@/options"
import type { listPostsService } from "@/services"

type Post = Awaited<ReturnType<typeof listPostsService>>[number]

export const PostCard = ({ post }: { post: Post }) => {
  const queryClient = useQueryClient()

  const { data: currentUser } = useQuery({
    queryKey: [
      "auth",
    ],
    queryFn: getCurrentUser,
  })

  const { mutate: deletePost, isPending } = useMutation({
    ...deletePostOptions({
      queryClient,
      onSuccess: () => {
        toast.success("Post deleted")
        queryClient.invalidateQueries({
          queryKey: [
            "posts",
          ],
        })
      },
      onError: () => toast.error("Failed to delete post"),
    }),
  })

  const isMyPost = currentUser?.id === post.user.id

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <Link
            className="font-semibold hover:underline"
            href={`/users?id=${post.user.id}`}
          >
            {post.user.name}
          </Link>
          <span className="text-muted-foreground text-sm">
            {post.user.email}
          </span>
        </div>
        {isMyPost && (
          <Button
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            disabled={isPending}
            onClick={() =>
              deletePost({
                id: post.id,
              })
            }
            size="icon"
            title="Delete post"
            variant="ghost"
          >
            <Trash2 className="size-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2 text-lg">{post.title}</CardTitle>
        {post.description && (
          <p className="whitespace-pre-wrap text-sm">{post.description}</p>
        )}
      </CardContent>
      <CardFooter>
        <span className="text-muted-foreground text-xs">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </CardFooter>
    </Card>
  )
}
