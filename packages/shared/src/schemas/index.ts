import z from "zod"

export const signInSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
})

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
})

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(5, "Content is required"),
})
