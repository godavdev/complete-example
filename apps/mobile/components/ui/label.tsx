"use client"

import type { ComponentProps } from "react"
import { StyleSheet, Text } from "react-native"
import { COLOR, FONT_FAMILY } from "./theme"

type LabelProps = ComponentProps<typeof Text>

export const Label = ({ style, ...props }: LabelProps) => (
  <Text
    style={[
      styles.label,
      style,
    ]}
    {...props}
  />
)

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: FONT_FAMILY,
    color: COLOR.foreground,
  },
})
