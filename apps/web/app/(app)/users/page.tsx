"use client"

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { findUserByIdOptions } from "@/options"
import { PostsFeed } from "../posts/feed"

const UserProfile = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    ...findUserByIdOptions({
      id: id ?? "",
    }),
  })

  if (!id) {
    return <div className="p-8">No user ID provided.</div>
  }

  if (isPending) {
    return <div className="p-8">Loading...</div>
  }

  if (error || !user) {
    return <div className="p-8 text-destructive">Error loading user</div>
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6 md:px-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">{user.email}</p>
            <p className="mt-4 text-muted-foreground text-sm">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-xl">Posts by {user.name}</h2>
        <PostsFeed userId={user.id} />
      </div>
    </div>
  )
}

const UserPage = () => (
  <Suspense fallback={<div className="p-8">Loading...</div>}>
    <UserProfile />
  </Suspense>
)

export default UserPage
