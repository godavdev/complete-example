import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { AuthProvider } from "./auth-provider"
import { QueryProvider } from "./query-provider"

const jetbrainsMono = JetBrains_Mono({
  subsets: [
    "latin",
  ],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Posts with auth",
  description: "A simple posts app with authentication",
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
      <body className="flex min-h-full flex-col">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
