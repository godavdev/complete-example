"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CircleUser, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { getCurrentUser, signOut } from "@/feats/auth/auth-services"

export const Header = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: user, isPending } = useQuery({
    queryKey: [
      "auth",
    ],
    queryFn: getCurrentUser,
  })

  const { mutate: handleSignOut, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      toast.success("Signed out successfully")
      queryClient.setQueryData(
        [
          "auth",
        ],
        null,
      )
      router.replace("/sign-in")
    },
    onError: () => toast.error("Failed to sign out"),
  })

  return (
    <header className="sticky top-0 flex items-center justify-between border-b bg-background px-4 py-2">
      <div className="flex items-center gap-2">
        <CircleUser className="size-5 text-muted-foreground" />
        <span className="font-medium text-sm">
          {isPending ? "Loading..." : user?.name}
        </span>
      </div>

      <Button
        disabled={isSigningOut}
        onClick={() => handleSignOut()}
        size="icon"
        title="Sign Out"
        variant="destructive"
      >
        <LogOut className="size-5" />
      </Button>
    </header>
  )
}
