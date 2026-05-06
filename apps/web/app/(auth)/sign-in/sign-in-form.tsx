"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@repo/shared"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { signIn } from "@/feats/auth/auth-services"

const ID = "sign-in-form"

export const SignInForm = () => {
  const form = useForm({
    // @ts-expect-error -
    resolver: zodResolver(signInSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  })

  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: signIn,
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
      toast(`You are signed in as: ${JSON.stringify(userData.name)}`)
      router.replace("/posts")
    } catch (error) {
      console.log("Error signing in:", error)
      toast.error("An error occurred while signing in.")
    }
  })

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id={ID}
          onSubmit={onSubmit}
        >
          <FieldGroup>
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
            Submit
          </Button>
          <Separator />
          <Button
            asChild
            variant="outline"
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
