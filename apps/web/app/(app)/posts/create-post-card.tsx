"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createPostOptions } from "@/options"

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
})

const ID = "create-post-form"

export const CreatePostCard = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    ...createPostOptions({
      queryClient,
      onSuccess: () => {
        form.reset()
        toast.success("Post created successfully!")
      },
      onError: () => toast.error("Failed to create post"),
    }),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await mutation.mutateAsync(data)
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id={ID}
          onSubmit={onSubmit}
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Title"
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
              name="description"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="What's on your mind?"
                    rows={3}
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
      <CardFooter className="justify-end">
        <Button
          disabled={mutation.isPending}
          form={ID}
          type="submit"
        >
          {mutation.isPending ? "Posting..." : "Post"}
        </Button>
      </CardFooter>
    </Card>
  )
}
