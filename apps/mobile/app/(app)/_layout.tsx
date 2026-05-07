"use client"

import { useQuery } from "@tanstack/react-query"
import { Redirect, Stack } from "expo-router"
import { getCurrentUserOptions } from "@/options/auth-options"

export default function AppLayout() {
  const { data, error, isPending } = useQuery(getCurrentUserOptions)

  if (isPending || !data || error) {
    return <Redirect href="/(auth)/sign-in" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="create"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  )
}
