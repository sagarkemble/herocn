import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const logos = [
  "Apple", "Unisys", "Hitachi", "BC Ferries", "Mater Private", "NMI", "Aisera", "Winningtemp",
  "MrBeast", "Mysten Labs", "Yazen", "Expatrio", "Higgsfield AI", "Bland AI", "Nixtla",
  "National Australia Bank", "Recare", "Toptal", "ByteDance", "FlutterFlow", "Euronet",
  "GetResponse", "Tidio", "Happy Scribe", "InBody", "Breezy HR", "UC Berkeley",
  "University of Waterloo", "Chalmers University of Technology", "IEEE",
]

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center px-5 pt-16 text-center sm:px-6 sm:pt-28">
      <h1 className="font-medium text-[11.25vw] leading-[1.05] tracking-[-0.022em] sm:text-[clamp(2rem,9.6vw,5rem)] sm:leading-none">
        Never start
        <br />
        from scratch
        <br className="sm:hidden" /> again.
      </h1>
      <p className="mt-6 max-w-md text-balance text-base text-muted-foreground sm:text-lg">
        Free components, premium templates, and AI agents that work inside your product.
      </p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button size="lg">
          Browse components
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
        <Button size="lg" variant="tertiary">
          Explore HeroUI Pro
        </Button>
      </div>
    </section>
  )
}

export function TrustedBy() {
  return (
    <section className="mx-auto mt-[72px] w-full max-w-[75rem] px-5 sm:mt-[120px] sm:px-6">
      <h2 className="text-center font-medium text-muted-foreground text-sm">
        Trusted by teams and builders at
      </h2>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {logos.map((l) => (
          <li key={l} className="font-semibold text-muted-foreground/80 text-sm tracking-tight">
            {l}
          </li>
        ))}
      </ul>
    </section>
  )
}
