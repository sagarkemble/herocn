import { Inter, Inter_Tight, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
// Display face for headlines. heroui.com uses its own "heroSans" (not public); Inter Tight is the closest open substitute.
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-display" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "HeroUI - Never start from scratch again (shadcn + shadcn-to-heroui demo)",
  description: "Sample landing page built from shadcn/ui components restyled with the shadcn-to-heroui skill.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, interTight.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
