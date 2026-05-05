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
  return data
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
    throw new Error("Failed to sign up")
  }
  return data
}

export const signOut = async () => {
  const { error } = await authClient.signOut()
  if (error) {
    throw new Error("Failed to sign out")
  }
}
