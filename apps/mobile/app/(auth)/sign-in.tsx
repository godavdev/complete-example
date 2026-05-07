"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@repo/shared"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { COLOR } from "@/components/ui/theme"
import { signInOptions } from "@/options/auth-options"

export default function SignInScreen() {
  const form = useForm({
    // @ts-expect-error -
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const queryClient = useQueryClient()
  const mutation = useMutation(signInOptions(queryClient))

  const router = useRouter()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await mutation.mutateAsync(data)
      router.replace("/(app)")
    } catch (error) {
      console.log("Error signing in:", error)
      Alert.alert("Error", "No se pudo iniciar sesión")
    }
  })

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
          <Label style={styles.title}>Sign In</Label>
        </View>
        <View style={styles.form}>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <View style={styles.field}>
                <Label
                  style={[
                    fieldState.error && {
                      color: COLOR.destructive,
                    },
                  ]}
                >
                  Email
                </Label>
                <Input
                  {...field}
                  autoCapitalize="none"
                  autoComplete="email"
                  error={!!fieldState.error}
                  keyboardType="email-address"
                  onChangeText={field.onChange}
                  placeholder="your@email.com"
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
                <Label
                  style={[
                    fieldState.error && {
                      color: COLOR.destructive,
                    },
                  ]}
                >
                  Password
                </Label>
                <Input
                  {...field}
                  error={!!fieldState.error}
                  onChangeText={field.onChange}
                  placeholder="Your password"
                  secureTextEntry
                  value={field.value}
                />
                {fieldState.error && (
                  <Label style={styles.error}>{fieldState.error.message}</Label>
                )}
              </View>
            )}
          />
          <Button onPress={onSubmit}>Sign In</Button>
          <Button
            onPress={() => router.push("/(auth)/sign-up")}
            variant="link"
          >
            Don't have an account? Sign Up
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
    gap: 8,
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
