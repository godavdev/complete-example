/** biome-ignore-all lint/performance/noNamespaceImport: <explanation> */
/** biome-ignore-all lint/style/noNestedTernary: <explanation> */

import * as Haptics from "expo-haptics"
import type { ComponentProps, ReactNode } from "react"
import {
  Pressable,
  StyleSheet,
  Text,
  type TextStyle,
  type ViewStyle,
} from "react-native"
import { COLOR, FONT_FAMILY, FONT_SIZE, SPACING } from "./theme"

type ButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | "link"

const pressableStyles = StyleSheet.create({
  base: {
    padding: SPACING.md,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  default: {
    backgroundColor: COLOR.primary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLOR.border,
  },
  secondary: {
    backgroundColor: COLOR.secondary,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  destructive: {
    backgroundColor: COLOR.destructive,
  },
  link: {
    backgroundColor: "transparent",
  },
})

const textStyles = StyleSheet.create({
  base: {
    fontSize: FONT_SIZE.md,
    fontWeight: "500",
    fontFamily: FONT_FAMILY,
  },
  default: {
    color: COLOR.primaryForeground,
  },
  outline: {
    color: COLOR.foreground,
  },
  secondary: {
    color: COLOR.secondaryForeground,
  },
  ghost: {
    color: COLOR.foreground,
  },
  destructive: {
    color: COLOR.destructiveForeground,
  },
  link: {
    color: COLOR.primary,
    textDecorationLine: "underline",
  },
})

interface ButtonProps extends Omit<ComponentProps<typeof Pressable>, "style"> {
  variant?: ButtonVariant
  onPress?: () => void
  children: ReactNode
  pressableStyle?: ViewStyle
  textStyle?: TextStyle
}

export const Button = ({
  variant = "default",
  disabled,
  onPress,
  children,
  pressableStyle: overridePressableStyle,
  textStyle: overrideTextStyle,
  ...props
}: ButtonProps) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onPress?.()
  }

  return (
    <Pressable
      disabled={disabled}
      onPress={disabled ? undefined : handlePress}
      style={({ pressed }) => [
        pressableStyles.base,
        pressableStyles[variant],
        {
          opacity: pressed ? 0.8 : disabled ? 0.5 : 1,
        },
        overridePressableStyle,
      ]}
      {...props}
    >
      <Text
        style={[
          textStyles.base,
          textStyles[variant],
          overrideTextStyle,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  )
}
