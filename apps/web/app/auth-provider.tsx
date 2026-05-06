"use client"
import { useQuery } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { getCurrentUser } from "@/feats/auth/auth-services"

const protectedRoutes = [
  "/",
  "/posts",
  "/users",
]

const publicRoutes = [
  "/sign-in",
  "/sign-up",
]

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isPending } = useQuery({
    queryKey: [
      "auth",
    ],
    queryFn: getCurrentUser,
  })
  const pathname = usePathname()
  const router = useRouter()
  console.log(
    "AuthProvider - data:",
    data,
    "error:",
    error,
    "isPending:",
    isPending,
  )
  useEffect(() => {
    if ((error || !(data || isPending)) && protectedRoutes.includes(pathname)) {
      router.replace("/sign-in")
    }
    if (data && publicRoutes.includes(pathname)) {
      router.replace("/posts")
    }
  }, [
    error,
    data,
    pathname,
    router,
    isPending,
  ])

  if (isPending) {
    return null
  }

  return <>{children}</>
}
