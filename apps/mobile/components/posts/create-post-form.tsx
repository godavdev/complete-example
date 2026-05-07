"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { createPostSchema } from "@repo/shared"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { Alert, StyleSheet, View } from "react-native"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createPostOptions } from "@/options"
import { Button } from "../ui/button"

export const CreatePostForm = () => {
  const form = useForm({
    // @ts-expect-error -
    resolver: zodResolver(createPostSchema),
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
        Alert.alert("Success", "Post created successfully!")
      },
      onError: (error) => {
        Alert.alert("Error", JSON.stringify(error))
      },
    }),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await mutation.mutateAsync(data)
  })

  return (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent style={styles.content}>
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <View style={styles.field}>
              <Input
                error={!!fieldState.error}
                onChangeText={field.onChange}
                placeholder="Title"
                value={field.value}
              />
              {fieldState.error && (
                <Label style={styles.error}>{fieldState.error.message}</Label>
              )}
            </View>
          )}
        />
        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <View style={styles.field}>
              <Textarea
                error={!!fieldState.error}
                onChangeText={field.onChange}
                placeholder="What's on your mind?"
                value={field.value}
              />
              {fieldState.error && (
                <Label style={styles.error}>{fieldState.error.message}</Label>
              )}
            </View>
          )}
        />
        <Button
          disabled={mutation.isPending}
          onPress={onSubmit}
        >
          {mutation.isPending ? "Posting..." : "Post"}
        </Button>
      </CardContent>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {},
  content: {
    gap: 16,
  },
  field: {
    gap: 4,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
})
