import type { Metadata } from "next"

import { SiteHeader } from "@/components/legacy-landing/header"
import { Hero, ProPromo, TrustedBy } from "@/components/legacy-landing/hero"
import { Products } from "@/components/legacy-landing/products"
import { OpenSource } from "@/components/legacy-landing/open-source"
import { Pro } from "@/components/legacy-landing/pro"
import { Agents } from "@/components/legacy-landing/agents"
import { HeroSpace } from "@/components/legacy-landing/herospace"
import {
  AiTooling,
  Blog,
  Community,
  FinalCta,
  FooterMark,
  SiteFooter,
  Testimonials,
} from "@/components/legacy-landing/rest"

export const metadata: Metadata = {
  title: "Legacy landing",
  description: "The heroui.com-style marketing landing, kept at /legacy.",
}

export default function LegacyLandingPage() {
  return (
    <div className="flex min-h-svh flex-col items-center overflow-x-clip">
      <SiteHeader />
      <main className="w-full flex-1">
        <Hero />
        <ProPromo />
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
      <SiteFooter />
      <FooterMark />
    </div>
  )
}
