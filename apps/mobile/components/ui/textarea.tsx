"use client"

import type { ComponentProps } from "react"
import { Platform, StyleSheet, TextInput } from "react-native"

import { useTheme } from "./theme"

type TextareaProps = ComponentProps<typeof TextInput> & {
  error?: boolean
}

export function Textarea({ error, style, ...props }: TextareaProps) {
  const { colors } = useTheme()

  return (
    <TextInput
      multiline
      placeholderTextColor={colors.mutedForeground}
      selectionColor={colors.ring}
      style={[
        styles.textarea,
        {
          backgroundColor: colors.input,
          borderColor: error ? colors.destructive : "transparent",
          color: colors.foreground,
        },
        style,
      ]}
      textAlignVertical="top"
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  textarea: {
    minHeight: 80,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "System" : "monospace",
  },
})
