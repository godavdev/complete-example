"use client"

import { KeyboardAvoidingView, StyleSheet } from "react-native"
import { CreatePostForm } from "@/components/posts/create-post-form"

export default function CreatePostModal() {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <CreatePostForm />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
})
