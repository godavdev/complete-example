import type { Post } from "@repo/domain"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const PostCard = ({ createdAt, title, description, user }: Post) => (
  <Card>
    <CardHeader>
      <CardTitle
        style={{
          fontSize: 14,
        }}
      >
        {user.name}
      </CardTitle>
      <CardDescription
        style={{
          fontSize: 14,
        }}
      >
        {user.email}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardContent>
    <CardFooter>
      <CardDescription
        style={{
          fontSize: 12,
          color: "#666",
        }}
      >
        {new Date(createdAt).toLocaleString()}
      </CardDescription>
    </CardFooter>
  </Card>
)
