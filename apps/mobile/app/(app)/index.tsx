"use client"

import { useRouter } from "expo-router"
import { StyleSheet, View } from "react-native"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuth } from "../../context/auth-context"
import { signOut } from "../../services/auth-service"

export default function HomeScreen() {
  const { user, setUser } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      setUser(null)
      router.replace("/(auth)/sign-in")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <View style={styles.container}>
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
        style={styles.button}
        variant="destructive"
      >
        Cerrar Sesión
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 16,
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
  button: {
    marginTop: 8,
  },
})
