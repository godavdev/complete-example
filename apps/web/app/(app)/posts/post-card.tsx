import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { listPostsService } from "@/feats/posts/post-services"

type Post = Awaited<ReturnType<typeof listPostsService>>[number]

export const PostCard = ({ post }: { post: Post }) => (
  <Card>
    <CardHeader>
      <div className="flex flex-col">
        <span className="font-semibold">{post.user.name}</span>
        <span className="text-muted-foreground text-sm">{post.user.email}</span>
      </div>
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
