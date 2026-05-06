/** biome-ignore-all lint/performance/noNamespaceImport: <explanation> */
"use client"

import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useState } from "react"
import { AuthProvider, useAuth } from "../context/auth-context"

SplashScreen.preventAutoHideAsync()

function RootLayoutContent() {
  const { isLoading } = useAuth()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync()
      setIsReady(true)
    }
  }, [
    isLoading,
  ])

  if (!isReady || isLoading) {
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
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  )
}
