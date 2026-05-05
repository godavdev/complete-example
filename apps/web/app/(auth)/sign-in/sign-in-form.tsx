"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
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

const schema = z.object({
  email: z.email(),

  password: z.string(),
})

const ID = "sign-in-form"

export const SignInForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      email: "",
    },
  })

  function onSubmit(data: z.infer<typeof schema>) {
    toast(`You submitted the following values: ${JSON.stringify(data)}`)
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id={ID}
          onSubmit={form.handleSubmit(onSubmit)}
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
