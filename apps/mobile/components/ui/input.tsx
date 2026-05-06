"use client"

import type { ComponentProps } from "react"
import { Platform, StyleSheet, TextInput } from "react-native"

import { useTheme } from "./theme"

type InputProps = ComponentProps<typeof TextInput> & {
  error?: boolean
}

export function Input({ error, style, ...props }: InputProps) {
  const { colors } = useTheme()

  return (
    <TextInput
      placeholderTextColor={colors.mutedForeground}
      selectionColor={colors.ring}
      style={[
        styles.input,
        {
          backgroundColor: colors.input,
          borderColor: error ? colors.destructive : "transparent",
          color: colors.foreground,
        },
        style,
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "System" : "monospace",
  },
})
