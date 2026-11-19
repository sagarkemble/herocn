"use client";

import {
  ArchiveIcon,
  BellOffIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileIcon,
  InboxIcon,
  MoreHorizontalIcon,
  PencilIcon,
  SearchIcon,
  SendIcon,
  StarIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import {useState} from "react";

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";

const folders = [
  {count: "4", icon: InboxIcon, label: "Inbox"},
  {count: "2", icon: StarIcon, label: "Starred"},
  {icon: SendIcon, label: "Sent"},
  {icon: FileIcon, label: "Drafts"},
  {icon: BellOffIcon, label: "Snoozed"},
  {icon: ArchiveIcon, label: "Archive"},
  {icon: InboxIcon, label: "Spam"},
  {icon: Trash2Icon, label: "Trash"},
];

const labels = [
  {color: "bg-primary", label: "Work"},
  {color: "bg-warning", label: "Personal"},
];

const messages = [
  {
    body: "Quick recap from this morning's launch review so we have it in writing.\n\nWe agreed on the final launch date (Tuesday the 24th) and the three must-ship items: onboarding tour, billing update flow, and the new analytics dashboard.\n\nParker and I will co-own the go/no-go checklist. Can you sync with me and Maya tomorrow at 10:30?",
    email: "carlos@heroui.dev",
    from: "Carlos Iglesias",
    id: "1",
    initials: "CI",
    preview: "We agreed on the final launch date and t…",
    starred: true,
    subject: "Launch recap + next steps",
    time: "10:21 AM",
  },
  {
    body: "Invoice INV-0241 for $2,450.00 is due tomorrow. You can download the PDF or pay from your dashboard.",
    email: "stripe@stripe.com",
    from: "Stripe",
    id: "2",
    initials: "S",
    preview: "Invoice INV-0241 for $2,450.00 is due t…",
    starred: true,
    subject: "Invoice INV-0241 is due tomorrow",
    time: "Yesterday",
  },
  {
    body: "You're booked on flight FL-482 from SFO → NRT on April 29. Seat 14A. Check in opens 24 hours before departure.",
    email: "flights@example.com",
    from: "Flights",
    id: "3",
    initials: "F",
    preview: "You're booked on flight FL-482 from SF…",
    starred: false,
    subject: "Flight itinerary: SFO → NRT",
    time: "Apr 22",
  },
  {
    body: "Review requested on #242 — fix(template-chat): inverted scroll and bounded chat height.",
    email: "noreply@github.com",
    from: "GitHub",
    id: "4",
    initials: "G",
    preview: "Review requested on #242 — fix(templa…",
    starred: false,
    subject: "[heroui/heroui.pro] Review requested on PR #242",
    time: "9:02 AM",
  },
  {
    body: "Pinging ahead of Friday's design review: final dashboard layout, chart colors, and responsive table header.",
    email: "maya@example.com",
    from: "Maya Okafor",
    id: "5",
    initials: "MO",
    preview: "Pinging ahead of Friday's design review…",
    starred: false,
    subject: "Design review: dashboard v3",
    time: "Mon",
  },
  {
    body: "8 issues closed, 3 blocked issues need triage, and your cycle is on track to finish Friday.",
    email: "amelia@linear.app",
    from: "Amelia from Linear",
    id: "6",
    initials: "AfL",
    preview: "8 issues closed, 3 blocked issues need t…",
    starred: false,
    subject: "Your weekly summary",
    time: "Mon",
  },
];

export function MailTemplate() {
  const [selected, setSelected] = useState(messages[0]!.id);
  const current = messages.find((m) => m.id === selected) ?? messages[0]!;

  return (
    <div className="flex h-full min-h-0 w-full bg-background text-sm">
      <aside className="flex w-48 shrink-0 flex-col gap-0.5 p-3 max-md:hidden">
        <div className="mb-3 flex items-center gap-2 px-1">
          <Avatar>
            <AvatarFallback className="bg-primary-soft text-primary-soft-foreground">Y</AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <p className="font-medium">You</p>
            <p className="text-muted-foreground text-xs">you@heroui.dev</p>
          </div>
        </div>
        {folders.map((folder, i) => (
          <Button
            key={folder.label}
            className="w-full justify-start"
            size="sm"
            variant={i === 0 ? "secondary" : "ghost"}
          >
            <folder.icon data-icon="inline-start" />
            <span className="flex-1 text-start">{folder.label}</span>
            {folder.count ? <span className="text-muted-foreground">{folder.count}</span> : null}
          </Button>
        ))}
        <p className="mt-4 mb-1 px-3 text-muted-foreground text-xs">Labels</p>
        {labels.map((label) => (
          <span key={label.label} className="flex h-8 items-center gap-2 px-3">
            <span className={`size-1.5 rounded-full ${label.color}`} />
            {label.label}
          </span>
        ))}
        <Button className="mt-auto" size="sm">
          <PencilIcon data-icon="inline-start" />
          New email
        </Button>
      </aside>
      <Separator orientation="vertical" />
      <div className="flex w-72 shrink-0 flex-col max-md:hidden">
        <div className="p-3">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
          </InputGroup>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col gap-0.5 p-2">
            {messages.map((item) => (
              <Button
                key={item.id}
                className="h-auto w-full flex-col items-stretch gap-0.5 py-2 text-start"
                size="sm"
                variant={item.id === selected ? "secondary" : "ghost"}
                onClick={() => setSelected(item.id)}
              >
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="truncate font-medium">{item.from}</span>
                  <span className="shrink-0 text-muted-foreground text-xs">{item.time}</span>
                </span>
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="min-w-0">
                    <span className="block truncate">{item.subject}</span>
                    <span className="block truncate text-muted-foreground text-xs">{item.preview}</span>
                  </span>
                  <StarIcon className={item.starred ? "size-3.5 shrink-0 fill-warning text-warning" : "size-3.5 shrink-0 text-muted-foreground"} />
                </span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="min-h-0 min-w-0 flex-1 p-3">
        <Card className="flex h-full min-h-0 flex-col">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Button aria-label="Close" size="icon-xs" variant="ghost">
                <XIcon />
              </Button>
              <Button aria-label="Delete" size="icon-xs" variant="ghost">
                <Trash2Icon />
              </Button>
              <Button aria-label="Archive" size="icon-xs" variant="ghost">
                <ArchiveIcon />
              </Button>
              <Button aria-label="Star" size="icon-xs" variant="ghost">
                <StarIcon className="fill-warning text-warning" />
              </Button>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              1 messages
              <Button aria-label="Previous" size="icon-xs" variant="ghost">
                <ChevronLeftIcon />
              </Button>
              <Button aria-label="Next" size="icon-xs" variant="ghost">
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
          <h3 className="font-semibold text-base">{current.subject}</h3>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{current.initials}</AvatarFallback>
              </Avatar>
              <div className="leading-tight">
                <p className="font-medium">{current.from}</p>
                <p className="flex items-center gap-1 text-muted-foreground text-xs">
                  {current.email}
                  <ChevronDownIcon className="size-3" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground text-xs">{current.time}</span>
              <Button aria-label="More" size="icon-xs" variant="ghost">
                <MoreHorizontalIcon />
              </Button>
            </div>
          </div>
          <ScrollArea className="min-h-0 flex-1">
            <p className="whitespace-pre-wrap leading-6">{current.body}</p>
          </ScrollArea>
          <div>
            <Button size="sm">Reply</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
