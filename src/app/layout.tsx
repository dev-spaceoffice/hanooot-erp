import type { Metadata } from "next"
import { Tajawal } from "next/font/google"
import { ReduxProvider } from "@/providers/redux-provider"
import "./globals.css"

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
})

export const metadata: Metadata = {
  title: "Hanooot ERP",
  description: "RTL-ready ERP foundation for Hanooot operations.",
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

const RootLayout = ({ children }: RootLayoutProps) => (
  <html className={`${tajawal.variable} h-full antialiased`} dir="rtl" lang="ar">
    <body className="min-h-full">
      <ReduxProvider>{children}</ReduxProvider>
    </body>
  </html>
)

export default RootLayout
