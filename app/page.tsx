import { SiteHeader, Wordmark } from "@/components/landing/header"
import { Hero, TrustedBy } from "@/components/landing/hero"
import { Products } from "@/components/landing/products"
import { OpenSource } from "@/components/landing/open-source"
import {
  Agents,
  AiTooling,
  Blog,
  Community,
  FinalCta,
  HeroSpace,
  Pro,
  SiteFooter,
  Testimonials,
} from "@/components/landing/more"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-col">
        <Hero />
        <TrustedBy />
        <Products />
        <OpenSource />
        <Pro />
        <Agents />
        <HeroSpace />
        <AiTooling />
        <Community />
        <Testimonials />
        <Blog />
        <FinalCta />
      </main>
      <SiteFooter wordmark={<Wordmark />} />
    </div>
  )
}
