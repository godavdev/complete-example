"use client"

import type { ComponentProps } from "react"
import { Platform, StyleSheet, Text, View } from "react-native"

import { useTheme } from "./theme"

type CardSize = "default" | "sm"

interface CardProps extends ComponentProps<typeof View> {
  size?: CardSize
}

export function Card({ size = "default", style, ...props }: CardProps) {
  const { colors } = useTheme()

  return (
    <View
      style={[
        styles.card,
        size === "sm" && styles.cardSmall,
        {
          backgroundColor: colors.card,
        },
        style,
      ]}
      {...props}
    />
  )
}

interface CardHeaderProps extends ComponentProps<typeof View> {}

export function CardHeader({ style, ...props }: CardHeaderProps) {
  return (
    <View
      style={[
        styles.cardHeader,
        style,
      ]}
      {...props}
    />
  )
}

interface CardTitleProps extends ComponentProps<typeof Text> {}

export function CardTitle({ style, ...props }: CardTitleProps) {
  const { colors } = useTheme()

  return (
    <Text
      style={[
        styles.cardTitle,
        {
          color: colors.cardForeground,
        },
        style,
      ]}
      {...props}
    />
  )
}

interface CardDescriptionProps extends ComponentProps<typeof Text> {}

export function CardDescription({ style, ...props }: CardDescriptionProps) {
  const { colors } = useTheme()

  return (
    <Text
      style={[
        styles.cardDescription,
        {
          color: colors.mutedForeground,
        },
        style,
      ]}
      {...props}
    />
  )
}

interface CardActionProps extends ComponentProps<typeof View> {}

export function CardAction({ style, ...props }: CardActionProps) {
  return (
    <View
      style={[
        styles.cardAction,
        style,
      ]}
      {...props}
    />
  )
}

interface CardContentProps extends ComponentProps<typeof View> {}

export function CardContent({ style, ...props }: CardContentProps) {
  return (
    <View
      style={[
        styles.cardContent,
        style,
      ]}
      {...props}
    />
  )
}

interface CardFooterProps extends ComponentProps<typeof View> {}

export function CardFooter({ style, ...props }: CardFooterProps) {
  return (
    <View
      style={[
        styles.cardFooter,
        style,
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    padding: 24,
    gap: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSmall: {
    padding: 16,
    gap: 16,
  },
  cardHeader: {
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "System" : "monospace",
  },
  cardDescription: {
    fontSize: 14,
  },
  cardAction: {
    alignSelf: "flex-end",
  },
  cardContent: {
    paddingHorizontal: 0,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
  },
})
