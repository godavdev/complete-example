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
  useEffect(() => {
    if ((error || !data) && protectedRoutes.includes(pathname)) {
      router.replace("/sign-in")
    }
    if (data && publicRoutes.includes(pathname)) {
      router.replace("/")
    }
  }, [
    error,
    data,
    pathname,
    router,
  ])

  if (isPending) {
    return null
  }

  return <>{children}</>
}
