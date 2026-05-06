import type { User } from "@repo/domain"
import { authClient } from "../libs/better-auth"

export const signIn = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<User> => {
  const { error, data } = await authClient.signIn.email({
    email,
    password,
  })
  if (error) {
    throw new Error(error.message || "Failed to sign in")
  }
  return {
    id: data.user.id,
    email: data.user.email,
    name: data.user.name,
    createdAt: data.user.createdAt,
    updatedAt: data.user.updatedAt,
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
}): Promise<User> => {
  const { error, data } = await authClient.signUp.email({
    email,
    password,
    name,
  })
  if (error) {
    console.log("Error signing up:", error)
    throw new Error(error.message || "Failed to sign up")
  }
  return {
    id: data.user.id,
    email: data.user.email,
    name: data.user.name,
    createdAt: data.user.createdAt,
    updatedAt: data.user.updatedAt,
  }
}

export const signOut = async () => {
  const { error } = await authClient.signOut()
  if (error) {
    throw new Error(error.message || "Failed to sign out")
  }
}

export const getSession = async (): Promise<User | null> => {
  const { error, data } = await authClient.getSession()
  if (error || !data?.user) {
    return null
  }
  return {
    id: data.user.id,
    email: data.user.email,
    name: data.user.name,
    createdAt: data.user.createdAt,
    updatedAt: data.user.updatedAt,
  }
}
