import { useColorScheme } from "react-native"

export const lightColors = {
  background: "#FFFFFF",
  foreground: "#353535",
  card: "#FFFFFF",
  cardForeground: "#353535",
  popover: "#FFFFFF",
  popoverForeground: "#353535",
  primary: "#353535",
  primaryForeground: "#FCFCFC",
  secondary: "#F5F5F5",
  secondaryForeground: "#353535",
  muted: "#F5F5F5",
  mutedForeground: "#8C8C8C",
  accent: "#F5F5F5",
  accentForeground: "#353535",
  destructive: "#D93843",
  border: "#EBEBEB",
  input: "#EBEBEB",
  ring: "#B3B3B3",
}

export const darkColors = {
  background: "#353535",
  foreground: "#FCFCFC",
  card: "#353535",
  cardForeground: "#FCFCFC",
  popover: "#353535",
  popoverForeground: "#FCFCFC",
  primary: "#EBEBEB",
  primaryForeground: "#353535",
  secondary: "#454545",
  secondaryForeground: "#FCFCFC",
  muted: "#454545",
  mutedForeground: "#B3B3B3",
  accent: "#454545",
  accentForeground: "#FCFCFC",
  destructive: "#E8686E",
  border: "#FFFFFF1A",
  input: "#FFFFFF26",
  ring: "#8C8C8C",
}

export const borderRadius = {
  sm: 0,
  md: 0,
  lg: 0,
  xl: 0,
  "2xl": 0,
  "4xl": 0,
  full: 0,
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
}

export function useTheme() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  return {
    colors: lightColors,
    borderRadius,
    spacing,
    isDark,
  }
}

export type Theme = ReturnType<typeof useTheme>
