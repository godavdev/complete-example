"use client"

import type { ComponentProps } from "react"
import { StyleSheet, Text, View } from "react-native"
import { COLOR, FONT_FAMILY } from "./theme"

interface CardProps extends ComponentProps<typeof View> {}

export const Card = ({ style, ...props }: CardProps) => (
  <View
    style={[
      styles.card,
      style,
    ]}
    {...props}
  />
)

interface CardHeaderProps extends ComponentProps<typeof View> {}

export const CardHeader = ({ style, ...props }: CardHeaderProps) => (
  <View
    style={[
      styles.cardHeader,
      style,
    ]}
    {...props}
  />
)

interface CardTitleProps extends ComponentProps<typeof Text> {}

export const CardTitle = ({ style, ...props }: CardTitleProps) => (
  <Text
    style={[
      styles.cardTitle,

      style,
    ]}
    {...props}
  />
)

interface CardDescriptionProps extends ComponentProps<typeof Text> {}

export const CardDescription = ({ style, ...props }: CardDescriptionProps) => (
  <Text
    style={[
      styles.cardDescription,
      style,
    ]}
    {...props}
  />
)

interface CardActionProps extends ComponentProps<typeof View> {}

export const CardAction = ({ style, ...props }: CardActionProps) => (
  <View
    style={[
      styles.cardAction,
      style,
    ]}
    {...props}
  />
)

interface CardContentProps extends ComponentProps<typeof View> {}

export const CardContent = ({ style, ...props }: CardContentProps) => (
  <View
    style={[
      styles.cardContent,
      style,
    ]}
    {...props}
  />
)

interface CardFooterProps extends ComponentProps<typeof View> {}

export const CardFooter = ({ style, ...props }: CardFooterProps) => (
  <View
    style={[
      styles.cardFooter,
      style,
    ]}
    {...props}
  />
)

const styles = StyleSheet.create({
  card: {
    padding: 24,
    gap: 24,
    shadowColor: COLOR.border,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: COLOR.card,
  },
  cardSmall: {
    padding: 16,
    gap: 16,
  },
  cardHeader: {
    gap: 6,
  },
  cardTitle: {
    color: COLOR.cardForeground,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: FONT_FAMILY,
  },
  cardDescription: {
    color: COLOR.mutedForeground,
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
