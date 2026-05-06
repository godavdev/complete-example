"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@repo/shared"
import { useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { Alert, StyleSheet, View } from "react-native"
import { useAuth } from "../../context/auth-context"
import { signIn } from "../../services/auth-service"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignInScreen() {
  const form = useForm({
    // @ts-expect-error -
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { setUser } = useAuth()
  const router = useRouter()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const user = await signIn(data)
      setUser(user)
      router.replace("/(app)")
    } catch (error) {
      console.log("Error signing in:", error)
      Alert.alert("Error", "No se pudo iniciar sesión")
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Label style={styles.title}>Iniciar Sesión</Label>
      </View>
      <View style={styles.form}>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <View style={styles.field}>
              <Label style={styles.fieldLabel}>Email</Label>
              <Input
                {...field}
                autoCapitalize="none"
                autoComplete="email"
                error={!!fieldState.error}
                keyboardType="email-address"
                onChangeText={field.onChange}
                placeholder="tu@email.com"
                value={field.value}
              />
              {fieldState.error && (
                <Label style={styles.error}>{fieldState.error.message}</Label>
              )}
            </View>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <View style={styles.field}>
              <Label style={styles.fieldLabel}>Contraseña</Label>
              <Input
                {...field}
                error={!!fieldState.error}
                onChangeText={field.onChange}
                placeholder="••••••••"
                secureTextEntry
                value={field.value}
              />
              {fieldState.error && (
                <Label style={styles.error}>{fieldState.error.message}</Label>
              )}
            </View>
          )}
        />
        <Button onPress={onSubmit}>Entrar</Button>
        <Button
          onPress={() => router.push("/(auth)/sign-up")}
          variant="link"
        >
          ¿No tienes cuenta? Regístrate
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  error: {
    color: "#D93843",
    fontSize: 12,
  },
})
