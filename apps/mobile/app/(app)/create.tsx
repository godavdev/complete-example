"use client"

import { StyleSheet, View } from "react-native"
import { CreatePostForm } from "@/components/posts/create-post-form"

export default function CreatePostModal() {
  return (
    <View style={styles.container}>
      <CreatePostForm />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
})
