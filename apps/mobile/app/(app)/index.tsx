"use client"

import { useRouter } from "expo-router"
import { Pressable, StyleSheet, Text, View } from "react-native"
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
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Pressable
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    marginTop: 8,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#d33",
    borderRadius: 8,
    padding: 14,
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
