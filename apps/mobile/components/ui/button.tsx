/** biome-ignore-all lint/performance/noNamespaceImport: <explanation> */
/** biome-ignore-all lint/style/noNestedTernary: <explanation> */

import * as Haptics from "expo-haptics"
import type { ReactNode } from "react"
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  type ViewStyle,
} from "react-native"

import { useTheme } from "./theme"

type ButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | "link"
type ButtonSize = "default" | "xs" | "sm" | "lg" | "icon" | "icon-sm"

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
  children: ReactNode
  style?: ViewStyle
}

function getVariantStyles(
  variant: ButtonVariant,
  colors: ReturnType<typeof useTheme>["colors"],
  size: ButtonSize,
) {
  const base = {
    default: {
      backgroundColor: colors.primary,
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: colors.border,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    ghost: {
      backgroundColor: "transparent",
    },
    destructive: {
      backgroundColor: colors.destructive,
    },
    link: {
      backgroundColor: "transparent",
    },
  }

  const textColors = {
    default: colors.primaryForeground,
    outline: colors.foreground,
    secondary: colors.secondaryForeground,
    ghost: colors.foreground,
    destructive: colors.destructive,
    link: colors.primary,
  }

  const height = {
    default: 44,
    xs: 28,
    sm: 36,
    lg: 48,
    icon: 44,
    "icon-sm": 32,
  }

  const paddingHorizontal = {
    default: 16,
    xs: 10,
    sm: 12,
    lg: 20,
    icon: 12,
    "icon-sm": 8,
  }

  return {
    ...base[variant],
    height: height[size],
    paddingHorizontal: paddingHorizontal[size],
    textColor: textColors[variant],
  }
}

export function Button({
  variant = "default",
  size = "default",
  disabled = false,
  loading = false,
  onPress,
  children,
  style,
}: ButtonProps) {
  const { colors } = useTheme()
  const variantStyles = getVariantStyles(variant, colors, size)

  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
    onPress?.()
  }

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={disabled || loading ? undefined : handlePress}
      style={({ pressed }) => [
        styles.button,
        variantStyles,
        {
          opacity: pressed ? 0.7 : disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <Text
          style={[
            styles.text,
            {
              color: variantStyles.textColor,
            },
          ]}
        >
          Loading...
        </Text>
      ) : typeof children === "string" ? (
        <Text
          style={[
            styles.text,
            {
              color: variantStyles.textColor,
            },
            variant === "link" && styles.linkText,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
      )
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "System" : "monospace",
  },
  linkText: {
    textDecorationLine: "underline",
  },
})
