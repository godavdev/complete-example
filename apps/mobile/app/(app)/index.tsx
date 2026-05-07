"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CreatePostForm } from "@/components/posts/create-post-form"
import { PostsFeed } from "@/components/posts/feed"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { getCurrentUserOptions } from "@/options/auth-options"
import { signOut } from "../../services/auth-service"

export default function HomeScreen() {
  const router = useRouter()
  const { data: user } = useQuery(getCurrentUserOptions)
  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace("/(auth)/sign-in")
    } catch (error) {
      console.error("Error signing out:", error)
    }
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
        <Button
          onPress={handleSignOut}
          pressableStyle={styles.signOutButton}
          variant="destructive"
        >
          Cerrar Sesión
        </Button>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <PostsFeed ListHeaderComponent={<CreatePostForm />} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  signOutButton: {
    paddingVertical: 8,
  },
})
