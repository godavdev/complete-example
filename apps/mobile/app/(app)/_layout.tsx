"use client"

import { Redirect, Stack } from "expo-router"
import { useAuth } from "@/context/auth-context"

export default function AppLayout() {
  const { user, isLoading } = useAuth()

  if (!(isLoading || user)) {
    return <Redirect href="/(auth)/sign-in" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}
