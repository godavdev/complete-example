import type { Post } from "@repo/domain"
import { StyleSheet } from "react-native"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export const PostCard = ({ post }: { post: Post }) => (
  <Card style={styles.card}>
    <CardHeader>
      <CardTitle>{post.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <Label style={styles.description}>{post.description}</Label>
    </CardContent>
  </Card>
)

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  description: {
    marginTop: 8,
    opacity: 0.8,
  },
})
