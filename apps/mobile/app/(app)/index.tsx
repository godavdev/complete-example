"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CreatePostForm } from "@/components/posts/create-post-form"
import { PostsFeed } from "@/components/posts/feed"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

  const Header = (
    <View style={styles.headerContainer}>
      <Card>
        <CardHeader>
          <CardTitle>Bienvenido</CardTitle>
        </CardHeader>
        <CardContent>
          <Label style={styles.name}>{user?.name}</Label>
          <Label style={styles.email}>{user?.email}</Label>
        </CardContent>
      </Card>
      <Button
        onPress={handleSignOut}
        variant="destructive"
      >
        Cerrar Sesión
      </Button>
      <View style={styles.spacer} />
      <CreatePostForm />
    </View>
  )

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <PostsFeed ListHeaderComponent={Header} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    marginTop: 8,
  },
  email: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  spacer: {
    height: 24,
  },
})
