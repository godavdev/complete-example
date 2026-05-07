"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpOptions } from "@/options/auth-options"

const schema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
})

export default function SignUpScreen() {
  const form = useForm({
    // @ts-expect-error -
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const router = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation(signUpOptions(queryClient))
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await mutation.mutateAsync(data)
      router.replace("/(app)")
    } catch (error) {
      console.log("Error signing up:", error)
      Alert.alert("Error", "No se pudo crear la cuenta")
    }
  })

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
        <View style={styles.header}>
          <Label style={styles.title}>Registrarse</Label>
        </View>
        <View style={styles.form}>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <View style={styles.field}>
                <Label style={styles.fieldLabel}>Nombre</Label>
                <Input
                  {...field}
                  autoCapitalize="words"
                  error={!!fieldState.error}
                  onChangeText={field.onChange}
                  placeholder="Tu nombre"
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
          <Button onPress={onSubmit}>Crear Cuenta</Button>
          <Button
            onPress={() => router.push("/(auth)/sign-in")}
            variant="link"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
