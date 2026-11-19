"use client"

import Link from "next/link"
import { SparklesIcon } from "lucide-react"
import { cn } from "cn"

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
} from "@/components/ui/code-block"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { skills } from "@/lib/skills"
import { ctaPrimary, ctaSecondary, SectionHeader } from "./ui-bits"

export function Skills() {
  return (
    <section id="skills" className="site-container section-gap scroll-mt-24">
      <SectionHeader
        eyebrowTone="foreground"
        eyebrow={
          <>
            <span className="flex size-4 items-center justify-center rounded-[5px] bg-primary text-primary-foreground">
              <SparklesIcon className="size-2.5" />
            </span>
            Agent skills
          </>
        }
        title="Restyle, theme, and preview"
        muted="from the chat."
        description="Three Cursor and Claude skills. They restyle your shadcn app, apply a theme, or copy the theme builder into another project. They are not an agent inside your product."
      />
      <ul className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6">
        {skills.map((s) => (
          <li key={s.name}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-4">
                <h3 className="font-medium text-base">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-6">{s.description}</p>
                <CodeBlock size="sm" className="mt-auto">
                  <CodeBlockActions className="opacity-100">
                    <CodeBlockCopyButton value={s.install} />
                  </CodeBlockActions>
                  <CodeBlockContent wrap>{s.install}</CodeBlockContent>
                </CodeBlock>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 max-sm:flex-nowrap max-sm:gap-2.5 sm:mt-12">
        <Link href="/docs/skills" className={cn(buttonVariants(), ctaPrimary, "max-sm:h-10 max-sm:flex-1")}>
          Skill docs
        </Link>
        <Link
          href="/themes"
          className={cn(buttonVariants({ variant: "tertiary" }), ctaSecondary, "max-sm:flex-1")}
        >
          Open theme builder
        </Link>
      </div>
    </section>
  )
}
