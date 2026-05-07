"use client"

import type { ComponentProps } from "react"
import { StyleSheet, TextInput } from "react-native"
import { COLOR, FONT_FAMILY } from "./theme"

type InputProps = ComponentProps<typeof TextInput> & {
  error?: boolean
}

export const Input = ({ error, style, ...props }: InputProps) => (
  <TextInput
    placeholderTextColor={COLOR.mutedForeground}
    selectionColor={COLOR.ring}
    style={[
      styles.input,
      {
        borderColor: error ? COLOR.destructive : COLOR.border,
      },
      style,
    ]}
    {...props}
  />
)

const styles = StyleSheet.create({
  input: {
    color: COLOR.foreground,
    backgroundColor: COLOR.input,
    height: 44,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: FONT_FAMILY,
  },
})
