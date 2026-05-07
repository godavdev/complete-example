"use client"

import { useQuery } from "@tanstack/react-query"
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native"
import { Label } from "@/components/ui/label"
import { listPostsOptions } from "@/options"
import { PostCard } from "./post-card"

export const PostsFeed = ({
  ListHeaderComponent,
}: {
  ListHeaderComponent?: React.ReactElement
}) => {
  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    ...listPostsOptions({}),
  })

  console.log("PostsFeed - posts:", posts, "isPending:", isPending, "error:", error)

  if (error) {
    return (
      <View style={styles.center}>
        <Label style={styles.errorText}>Failed to load posts</Label>
      </View>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={posts}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => (
        <View style={styles.empty}>
          {isPending ? (
            <ActivityIndicator />
          ) : (
            <Label>No posts yet. Be the first to post!</Label>
          )}
        </View>
      )}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  center: {
    padding: 24,
    alignItems: "center",
  },
  empty: {
    padding: 24,
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
})
