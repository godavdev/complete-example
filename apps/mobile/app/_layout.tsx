/** biome-ignore-all lint/performance/noNamespaceImport: <explanation> */
"use client"

import { useQuery } from "@tanstack/react-query"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { getCurrentUserOptions } from "@/options/auth-options"
import { QueryProvider } from "../providers/query-provider"

SplashScreen.preventAutoHideAsync()

function RootLayoutContent() {
  const { isPending } = useQuery(getCurrentUserOptions)

  useEffect(() => {
    if (!isPending) {
      SplashScreen.hideAsync()
    }
  }, [
    isPending,
  ])

  // if (error) {
  //   throw new Error("Failed to check authentication status")
  // }

  if (isPending) {
    return null
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
        gestureEnabled: false,
      }}
    />
  )
}

export default function RootLayout() {
  return (
    <QueryProvider>
      <RootLayoutContent />
    </QueryProvider>
  )
}
