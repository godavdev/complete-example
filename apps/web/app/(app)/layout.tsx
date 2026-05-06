import { Header } from "./header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
