import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import ThemeToggle from "@/components/ui/themeToggle"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TaskMaster - Gestión de Tareas",
  description: "Aplicación para gestionar tareas de manera eficiente",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
              <div className="font-bold text-xl">TaskMaster</div>
              <ThemeToggle />
            </div>
          </header>
          {children}
        </div>
        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  )
}

