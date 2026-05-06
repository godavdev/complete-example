"use client"

import type { ComponentProps } from "react"
import { Platform, StyleSheet, Text } from "react-native"

import { useTheme } from "./theme"

type LabelProps = ComponentProps<typeof Text>

export function Label({ style, ...props }: LabelProps) {
  const { colors } = useTheme()

  return (
    <Text
      style={[
        styles.label,
        {
          color: colors.foreground,
        },
        style,
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "System" : "monospace",
  },
})
