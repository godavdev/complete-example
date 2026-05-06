"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import z from "zod"
import { useAuth } from "../../context/auth-context"
import { signUp } from "../../services/auth-service"

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

  const { setUser } = useAuth()
  const router = useRouter()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const user = await signUp(data)
      setUser(user)
      router.replace("/(app)")
    } catch (error) {
      console.log("Error signing up:", error)
      Alert.alert("Error", "No se pudo crear la cuenta")
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <View style={styles.form}>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <View>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                {...field}
                autoCapitalize="words"
                onChangeText={field.onChange}
                placeholder="Tu nombre"
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
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/(auth)/sign-in")}
          style={styles.link}
        >
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
