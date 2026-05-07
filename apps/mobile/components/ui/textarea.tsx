"use client"

import type { ComponentProps } from "react"
import { StyleSheet, TextInput } from "react-native"
import { COLOR, FONT_FAMILY } from "./theme"

type TextareaProps = ComponentProps<typeof TextInput> & {
  error?: boolean
}

export const Textarea = ({ error, style, ...props }: TextareaProps) => (
  <TextInput
    multiline
    placeholderTextColor={COLOR.mutedForeground}
    selectionColor={COLOR.ring}
    style={[
      styles.textarea,
      {
        borderColor: error ? COLOR.destructive : COLOR.border,
      },
      style,
    ]}
    textAlignVertical="top"
    {...props}
  />
)

const styles = StyleSheet.create({
  textarea: {
    minHeight: 80,
    borderWidth: 1,
    padding: 14,
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    backgroundColor: COLOR.input,
    color: COLOR.foreground,
  },
})
