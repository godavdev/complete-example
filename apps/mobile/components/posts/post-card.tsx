import type { Post } from "@repo/domain"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "expo-router"
import { Pressable } from "react-native"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { deletePostOptions } from "@/options"
import { getCurrentUserOptions } from "@/options/auth-options"
import { Button } from "../ui/button"

export const PostCard = ({ createdAt, title, description, user, id }: Post) => {
  const { data: userData, error, isPending } = useQuery(getCurrentUserOptions)
  const queryClient = useQueryClient()
  const mutation = useMutation(
    deletePostOptions({
      queryClient,
    }),
  )
  if (error || isPending || !userData) {
    throw new Error("Failed to load post")
  }

  const isMyPost = userData.id === user.id
  const deletePost = () =>
    mutation.mutate({
      id,
    })

  return (
    <Card>
      <CardHeader
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          asChild
          href={{
            pathname: "/users/[userId]",
            params: {
              userId: user.id,
            },
          }}
        >
          <Pressable
            style={{
              gap: 6,
            }}
          >
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
          </Pressable>
        </Link>
        {isMyPost ? (
          <Button
            onPress={deletePost}
            pressableStyle={{
              padding: 6,
            }}
            textStyle={{
              fontSize: 12,
            }}
            variant="destructive"
          >
            Delete
          </Button>
        ) : null}
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <CardDescription
          style={{
            fontSize: 12,
          }}
        >
          {new Date(createdAt).toLocaleString()}
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
