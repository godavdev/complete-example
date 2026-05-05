import type { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex h-svh w-full items-center justify-center">
    {children}
  </div>
)

export default AuthLayout
