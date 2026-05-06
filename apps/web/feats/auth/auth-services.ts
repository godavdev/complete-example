import { authClient } from "@/lib/better-auth"

export const signIn = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const { error, data } = await authClient.signIn.email({
    email,
    password,
  })
  if (error) {
    throw new Error("Failed to sign in")
  }
  return {
    id: data.user.id,
    email: data.user.email,
    name: data.user.name,
  }
}

export const signUp = async ({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name: string
}) => {
  const { error, data } = await authClient.signUp.email({
    email,
    password,
    name,
  })
  if (error) {
    console.log("Error signing up:", error)
    throw new Error("Failed to sign up")
  }
  return {
    id: data.user.id,
    email: data.user.email,
    name: data.user.name,
  }
}

export const signOut = async () => {
  const { error } = await authClient.signOut()
  if (error) {
    throw new Error("Failed to sign out")
  }
}

export const signInWithGitHub = async () => {
  const { error } = await authClient.signIn.social({
    provider: "github",
  })
  if (error) {
    console.log("Error signing in with GitHub:", error)
    throw new Error("Failed to sign in with GitHub")
  }
}

export const getCurrentUser = async () => {
  const { error, data } = await authClient.getSession()
  if (error) {
    console.log("Error getting current user:", error)
    throw new Error("Failed to get current user")
  }
  if (!data?.user) {
    return null
  }
  return {
    id: data.user.id,
    email: data.user.email,
    name: data.user.name,
  }
}
