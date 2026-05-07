"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { StyleSheet, View } from "react-native"
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
    <View style={styles.container}>
      <PostsFeed ListHeaderComponent={Header} />
    </View>
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
