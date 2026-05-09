"use client"

import { useQuery } from "@tanstack/react-query"
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native"
import { Label } from "@/components/ui/label"
import { listPostsOptions } from "@/options"
import { PostCard } from "./post-card"

export const PostsFeed = ({ userId }: { userId?: string }) => {
  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    ...listPostsOptions({
      userId,
    }),
  })

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
      renderItem={({ item }) => (
        <PostCard
          {...item}
          key={item.id}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    gap: 16,
    paddingHorizontal: 16,
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
