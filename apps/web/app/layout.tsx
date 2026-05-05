import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const jetbrainsMono = JetBrains_Mono({
  subsets: [
    "latin",
  ],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Todo with auth",
  description:
    "A simple todo app with authentication",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className={cn("h-full", "font-mono", jetbrainsMono.variable)}
      lang="es"
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
