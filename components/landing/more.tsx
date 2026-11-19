"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  CalendarIcon,
  ColumnsIcon,
  CommandIcon,
  FilterIcon,
  BarChart3Icon,
  Grid3x3Icon,
  PlugIcon,
  TerminalIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Bars, FeatureList, Section, SectionHeading } from "./ui-bits"

/* ---------------- HeroUI Pro ---------------- */
const proComponents = [
  { icon: CommandIcon, name: "Command" },
  { icon: ColumnsIcon, name: "Kanban" },
  { icon: BarChart3Icon, name: "Stats" },
  { icon: FilterIcon, name: "Filters" },
  { icon: CalendarIcon, name: "Agenda" },
  { icon: Grid3x3Icon, name: "DataGrid" },
]

function TemplatePreview({ name }: { name: string }) {
  return (
    <Card variant="secondary" className="min-h-64">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Open the {name} template preview</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Card key={i} size="sm">
            <CardContent className="flex flex-col gap-2">
              <span className="text-muted-foreground text-xs">Metric {i + 1}</span>
              <Bars values={[3, 5, 4, 6, 8, 7, 9].map((v) => v + i)} className="h-16" barClassName="bg-primary-soft" />
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}

export function Pro() {
  return (
    <Section id="pro">
      <SectionHeading
        eyebrow="HeroUI Pro"
        title={<>Move faster<br />with HeroUI Pro.</>}
        description="Components, templates, and AI tooling for React and React Native. Made for teams that care about the details."
      />
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {proComponents.map((c) => (
          <Card key={c.name} size="sm" className="items-start">
            <CardContent className="flex flex-col gap-3">
              <c.icon className="size-5 text-primary" />
              <div>
                <p className="font-medium text-sm">{c.name}</p>
                <p className="text-muted-foreground text-xs">Web and mobile</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 flex flex-col gap-6">
        <SectionHeading
          align="start"
          eyebrow="Pro templates"
          title="Start closer to finished."
          description="Full-page, responsive templates for dashboards, CRM, mail, chat, and finance. Strong structure from the first commit."
        />
        <Tabs defaultValue="Dashboard">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsList className="w-auto!">
              {["Dashboard", "Mail", "Chat", "Finances"].map((t) => (
                <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
              ))}
            </TabsList>
            <div className="flex flex-wrap gap-2">
              {["Glass", "Mouve", "Brutalism", "Default"].map((t) => (
                <Badge key={t} variant={t === "Default" ? "primary" : "default"} size="lg">{t}</Badge>
              ))}
            </div>
          </div>
          {["Dashboard", "Mail", "Chat", "Finances"].map((t) => (
            <TabsContent key={t} value={t} className="p-0">
              <TemplatePreview name={t} />
            </TabsContent>
          ))}
        </Tabs>
        <FeatureList
          items={[
            { title: "Premium components", description: "Kanban, data grid, charts, command menu, and more." },
            { title: "Full templates", description: "Complete apps for web and mobile, ready to make your own." },
            { title: "Design systems", description: "Figma files and themes that stay in sync with code." },
            { title: "Web and mobile", description: "The same design language across web, iOS, and Android." },
          ]}
        />
        <div className="flex flex-wrap gap-3">
          <Button>Explore HeroUI Pro</Button>
          <Button variant="tertiary">View pricing</Button>
        </div>
      </div>
    </Section>
  )
}

/* ---------------- HeroUI Agents ---------------- */
const suggestions = [
  "Chart MRR growth over the last 12 months",
  "Compare MRR, gross burn, net burn, and runway",
  "Rank our top vendors over the last 7 days",
]

export function Agents() {
  return (
    <Section id="agents">
      <SectionHeading
        eyebrow={<span className="inline-flex items-center gap-2">HeroUI Agents <Badge variant="primary" size="sm">beta</Badge></span>}
        title={<>Turn every product into<br />an AI-native experience.</>}
        description="An agent that understands your product, takes action, and generates the right interface. It works for your users, inside your app."
      />
      <Tabs defaultValue="Banking" className="mt-12 items-center">
        <TabsList className="w-auto! max-w-full overflow-x-auto">
          {["Banking", "Maps", "Shopping", "Finance", "Travel", "Email"].map((t) => (
            <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
          ))}
        </TabsList>
        {["Banking", "Maps", "Shopping", "Finance", "Travel", "Email"].map((t) => (
          <TabsContent key={t} value={t} className="w-full p-0">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardDescription>New chat</CardDescription>
                <CardTitle className="text-base">How can {t} Copilot help?</CardTitle>
                <CardDescription>Live answers with charts, metrics, and tables.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <Button key={s} size="sm" variant="outline">{s}</Button>
                  ))}
                </div>
                <div className="flex flex-col gap-2 rounded-3xl bg-default p-2">
                  <Textarea variant="secondary" placeholder={`Ask ${t} Copilot…`} className="min-h-16 resize-none bg-transparent" />
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <Switch id={`approve-${t}`} defaultChecked />
                      <Label htmlFor={`approve-${t}`} className="font-normal text-muted-foreground">Approve for me</Label>
                    </div>
                    <Button size="icon-sm" aria-label="Send"><ArrowUpIcon /></Button>
                  </div>
                </div>
                <p className="text-center text-muted-foreground text-xs">Agent may make mistakes. Verify all outputs.</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-12">
        <FeatureList
          items={[
            { title: "Connect your stack", description: "Give the agent product data and actions while the signed-in user's permissions stay in place." },
            { title: "Gate sensitive actions", description: "Require explicit approval before the agent changes records, filters, or workflows." },
            { title: "Customize to your needs", description: "Match your agent to your product with full control over its design system, layout, and visual style." },
            { title: "See how your agent performs", description: "Track agent usage, users, conversations, performance, and activity from one place." },
          ]}
        />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button>Request access</Button>
        <Button variant="tertiary">View all examples</Button>
      </div>
    </Section>
  )
}

/* ---------------- HeroSpace ---------------- */
export function HeroSpace() {
  const tasks = [
    "Send Maya the latest dashboard frames",
    "Confirm Tuesday the 24th launch date",
    "Pay invoice INV-0241",
  ]
  return (
    <Section id="herospace">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <SectionHeading
          align="start"
          eyebrow={<span className="inline-flex items-center gap-2">HeroSpace <Badge size="sm">alpha</Badge></span>}
          title={<>Everything that matters,<br />in one workspace.</>}
          description="Mail, calendar, support, tasks, and notes in one Mac app, run by the agents you already pay for."
        >
          <div className="flex flex-wrap gap-3">
            <Button>Request early access</Button>
            <Button variant="tertiary">Explore HeroSpace</Button>
          </div>
        </SectionHeading>
        <Card>
          <CardHeader>
            <CardTitle>Everything you owe, in one list</CardTitle>
            <CardDescription>Promises from your mail, tickets, and calls become tasks that link back to where they came from.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {tasks.map((t, i) => (
              <div key={t} className="flex items-center gap-3">
                <Checkbox id={`task-${i}`} defaultChecked={i === 1} />
                <Label htmlFor={`task-${i}`} className="font-normal">{t}</Label>
              </div>
            ))}
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-muted-foreground text-xs">You approve what goes out</span>
            <Button size="sm">Approve</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-12">
        <FeatureList
          items={[
            { title: "Join every call prepared", description: "An agent reads the invite, your notes, and past mail, then writes down what you owe the guests." },
            { title: "Replies already drafted", description: "Your agent drafts replies to the mail waiting on you, in your voice, and saves them in Gmail." },
            { title: "Everything you owe, in one list", description: "Promises from your mail, tickets, and calls become tasks that link back to where they came from." },
            { title: "You approve what goes out", description: "Drafts, calendar changes, and task edits wait for your OK, and run on your own Claude or ChatGPT plan." },
          ]}
        />
      </div>
    </Section>
  )
}

/* ---------------- AI tooling ---------------- */
export function AiTooling() {
  return (
    <Section id="ai">
      <SectionHeading
        eyebrow="AI tooling"
        title={<>Supercharge your<br />AI workflow.</>}
        description="Build faster with our Skills and MCPs. Give your agents taste and build beautiful interfaces by default."
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Button><PlugIcon data-icon="inline-start" /> Connect MCP</Button>
          <Button variant="tertiary"><TerminalIcon data-icon="inline-start" /> Install skills</Button>
        </div>
      </SectionHeading>
      <Card className="mx-auto mt-12 max-w-2xl">
        <CardHeader>
          <CardTitle>For coding agents</CardTitle>
          <CardDescription>React MCP · Native MCP · Pro React MCP · Pro Native MCP · Agents MCP · Agent skills</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center gap-2 rounded-2xl bg-default px-3 py-2 font-mono text-sm">
            <span className="text-muted-foreground">$</span>
            <span className="flex-1 truncate">Paste into Cursor, Claude Code, or Codex</span>
            <Kbd>⌘</Kbd><Kbd>V</Kbd>
          </div>
          <div className="flex flex-wrap gap-2">
            {["llms.txt", "AGENTS.md", "CLI", "Design Taste"].map((t) => (
              <Badge key={t} size="lg">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Section>
  )
}

/* ---------------- Community ---------------- */
export function Community() {
  const [month, setMonth] = React.useState([11])
  const downloads = [10, 12, 13, 15, 17, 18, 21, 23, 25, 27, 30, 33.3]
  return (
    <Section id="community">
      <SectionHeading eyebrow="Community" title={<>Built in the open.<br />Shaped by the community.</>} />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          { v: "38.3k+", t: "GitHub stars, combined", d: "Across HeroUI, HeroUI Native, and Tailwind Variants." },
          { v: "YC", t: "Backed by Y Combinator", d: "A focused team building the UI ecosystem for your next product." },
          { v: "10k+", t: "Discord members", d: "Get help, share what you ship, and shape what comes next." },
        ].map((s) => (
          <Card key={s.t}>
            <CardContent className="flex flex-col gap-1">
              <span className="font-medium text-4xl tracking-tight">{s.v}</span>
              <span className="font-medium text-sm">{s.t}</span>
              <span className="text-muted-foreground text-sm">{s.d}</span>
            </CardContent>
          </Card>
        ))}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">A growing developer community.</CardTitle>
            <CardDescription>Monthly npm downloads across our open source projects.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-4xl tracking-tight">33.3M+</span>
              <span className="text-muted-foreground text-sm">Monthly downloads, combined</span>
            </div>
            <Bars
              values={downloads}
              className="h-40"
              barClassName="bg-primary-soft"
              highlight={month[0]}
            />
            <Slider value={month} onValueChange={(v) => setMonth(Array.isArray(v) ? [...v] : [v])} min={0} max={11} step={1} aria-label="Month" />
            <p className="text-muted-foreground text-xs">
              Illustrative growth curve. Drag to highlight month {month[0] + 1} of 12.
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}

/* ---------------- Testimonials ---------------- */
const testimonials = [
  { q: "@hero_ui is hands down the best library I've worked with so far! Having a great UI/UX design has never been this easy. Honestly impressed about how fast it is to have a clean looking dashboard with it using the Theme Builder. This is how a modern library should feel! 5/5", n: "HeroSynapsis", r: "@HeroSynapsis" },
  { q: "Also ditched shadcn lately in favour of HeroUI, less to maintain and things look good right away. Simplicity lol", n: "chris jayden", r: "Building @langrelay" },
  { q: "Beautiful animated and customizable components! Probably my favorite component UI library for React/NextJS.", n: "Noah Youngs", r: "Product Hunt" },
  { q: "There is no better library. I love you guys", n: "Jeff Scott", r: "Software Engineer" },
  { q: "First of all, congrats on Hero UI - the design system, DX, and accessibility are just amazing. I used Hero UI (formerly NextUI) in several React projects and really loved the experience.", n: "ValentinOsvaldo", r: "GitHub" },
  { q: "NextUI components are beautiful and super easy to integrate. It saves much of the design hassle!", n: "Hyun Jie Jung", r: "Weavel" },
  { q: "There is nothing I can't build with this stack. @tan_stack + @hero_ui + @convex + @expo. Literally my starting point to build anything I want.", n: "Jeff Scott", r: "Software Engineer" },
  { q: "Great to see my fix landed! Awesome package and always quick to fix bugs!", n: "Eliot Gevers", r: "@EliotGevers" },
  { q: "Yeah, what I really love about HeroUI is how clean and consistent everything feels, plus the interactions and feedback are super smooth. It just feels so nice to use.", n: "Be Less", r: "An indie developer following AI." },
]

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading eyebrow="Testimonials" title="In their words." description="From the people building with HeroUI." />
      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {testimonials.map((t, i) => (
          <Card key={i} className="mb-4 break-inside-avoid">
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm leading-6">{t.q}</p>
              <div className="flex items-center gap-3">
                <Avatar size="sm"><AvatarFallback>{t.n.slice(0, 1).toUpperCase()}</AvatarFallback></Avatar>
                <div>
                  <p className="font-medium text-sm">{t.n}</p>
                  <p className="text-muted-foreground text-xs">{t.r}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- Blog ---------------- */
export function Blog() {
  return (
    <Section id="blog">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading align="start" eyebrow="Blog" title="From the blog." description="Guides and updates." />
        <Button variant="tertiary" size="sm">All posts</Button>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { t: "How Styling and Theming Work in HeroUI Native", d: "Jul 31, 2026" },
          { t: "Why Choose HeroUI for Your Design System", d: "May 17, 2026" },
          { t: "12 Best React UI Component Libraries in 2026", d: "May 16, 2026" },
        ].map((p) => (
          <Card key={p.t} className="transition-shadow hover:shadow-md">
            <div className="aspect-[16/9] rounded-2xl bg-surface-secondary" />
            <CardHeader>
              <CardTitle className="text-base">{p.t}</CardTitle>
              <CardDescription>{p.d}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- CTA + footer ---------------- */
export function FinalCta() {
  return (
    <Section className="text-center">
      <p className="text-balance font-medium text-[2.125rem] leading-[38px] tracking-[-0.02em] sm:text-5xl sm:leading-tight">
        Ready for you
        <br />
        and your agents.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button>Browse components</Button>
        <Button variant="tertiary">Get HeroUI Pro</Button>
        <Button variant="tertiary">Request Agents access</Button>
        <Button variant="tertiary">Request HeroSpace access</Button>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        <Badge>GDPR : In progress</Badge>
        <Badge>SOC 2 Type II : In progress</Badge>
      </div>
      <div className="mx-auto mt-10 flex max-w-sm gap-2">
        <Input type="email" placeholder="you@example.com" aria-label="Email" />
        <Button variant="outline">Subscribe</Button>
      </div>
    </Section>
  )
}

const footer: Record<string, string[]> = {
  "HeroUI React": ["Quick start", "Components", "Theming", "Styling", "Design principles", "Migration guide", "Releases", "Showcase", "Roadmap", "GitHub"],
  "HeroUI Native": ["Quick start", "Components", "Theming", "Styling", "Animation", "Design principles", "Releases", "Roadmap", "Demo app for iOS", "GitHub"],
  "HeroUI Pro": ["Components", "Templates", "Native components", "Native templates", "Design Systems", "Theming", "Figma", "Pricing", "Licensing", "Documentation"],
  "HeroUI Agents": ["Documentation", "Installation", "Quickstart", "Generative UI", "Client tools", "Knowledge base", "API reference", "Examples", "Live demos", "Request access"],
  "For coding agents": ["React MCP", "Native MCP", "Pro React MCP", "Pro Native MCP", "Agents MCP", "Agent skills", "Design Taste", "llms.txt", "AGENTS.md", "CLI"],
  Company: ["About", "Blog", "Enterprise", "Contact", "Discord", "Privacy", "Terms", "License"],
}

export function SiteFooter({ wordmark }: { wordmark: React.ReactNode }) {
  return (
    <footer className="mx-auto mt-[72px] w-full max-w-[75rem] px-5 pb-10 sm:mt-28 sm:px-6">
      <Separator />
      <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
        {Object.entries(footer).map(([h, links]) => (
          <div key={h} className="flex flex-col gap-2">
            <h3 className="font-medium text-sm">{h}</h3>
            {links.map((l) => (
              <a key={l} href="#" className="text-muted-foreground text-sm transition-colors hover:text-foreground">
                {l}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {wordmark}
        <p className="text-muted-foreground text-xs">© 2026 NextUI Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
