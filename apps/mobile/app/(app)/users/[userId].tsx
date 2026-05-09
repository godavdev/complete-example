"use client"

import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams } from "expo-router"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PostsFeed } from "@/components/posts/posts-feed"
import { Label } from "@/components/ui/label"
import { findUserByIdOptions } from "@/options"

export default function HomeScreen() {
  const { userId } = useLocalSearchParams()

  const {
    data: user,
    isPending,
    error,
  } = useQuery(
    findUserByIdOptions({
      id: String(userId),
    }),
  )

  if (isPending) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={[
            styles.topBar,
          ]}
        >
          <Label style={styles.name}>Loading user...</Label>
        </View>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={[
            styles.topBar,
          ]}
        >
          <Label style={styles.name}>User not found</Label>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={[
          styles.topBar,
        ]}
      >
        <Label style={styles.name}>{user?.name}</Label>
      </View>

      <PostsFeed userId={user.id} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
})
