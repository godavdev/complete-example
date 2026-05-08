"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "@repo/shared"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/dist/client/components/navigation"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { signUp } from "@/feats/auth/auth-services"

const ID = "sign-up-form"

export const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  })
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "auth",
        ],
      })
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const userData = await mutation.mutateAsync(data)
      toast(`Welcome, ${userData.name}! Your account has been created.`)
      router.replace("/posts")
    } catch (error) {
      console.log("Error signing up:", error)
      toast.error("An error occurred while signing up.")
    }
  })

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id={ID}
          onSubmit={onSubmit}
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${ID}-${field.name}`}>Name</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id={`${ID}-${field.name}`}
                    placeholder="Enter your name"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[
                        fieldState.error,
                      ]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${ID}-${field.name}`}>Email</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id={`${ID}-${field.name}`}
                    placeholder="Enter your email"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[
                        fieldState.error,
                      ]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${ID}-${field.name}`}>
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id={`${ID}-${field.name}`}
                    placeholder="Enter your password"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[
                        fieldState.error,
                      ]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="responsive">
          <Button
            form={ID}
            type="submit"
          >
            Sign Up
          </Button>
          <Separator />
          <Button
            asChild
            variant="outline"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
