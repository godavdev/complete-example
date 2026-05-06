"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@repo/shared"
import { useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { useAuth } from "../../context/auth-context"
import { signIn } from "../../services/auth-service"

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
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.form}>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                {...field}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                onChangeText={field.onChange}
                placeholder="tu@email.com"
                style={[
                  styles.input,
                  fieldState.error && styles.inputError,
                ]}
                value={field.value}
              />
              {fieldState.error && (
                <Text style={styles.error}>{fieldState.error.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <View>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                {...field}
                onChangeText={field.onChange}
                placeholder="••••••••"
                secureTextEntry
                style={[
                  styles.input,
                  fieldState.error && styles.inputError,
                ]}
                value={field.value}
              />
              {fieldState.error && (
                <Text style={styles.error}>{fieldState.error.message}</Text>
              )}
            </View>
          )}
        />
        <Pressable
          onPress={onSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/(auth)/sign-up")}
          style={styles.link}
        >
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
        </Pressable>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#f00",
  },
  error: {
    color: "#f00",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#007",
    borderRadius: 8,
    padding: 14,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  link: {
    marginTop: 16,
  },
  linkText: {
    color: "#007",
    fontSize: 14,
    textAlign: "center",
  },
})
