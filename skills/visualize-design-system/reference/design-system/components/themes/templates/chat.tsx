"use client";

import {
  ArrowUpIcon,
  CompassIcon,
  LibraryIcon,
  MessageSquareIcon,
  PaperclipIcon,
  SearchIcon,
  ShareIcon,
  SquarePenIcon,
} from "lucide-react";
import {useState} from "react";

import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Bubble, BubbleContent} from "@/components/ui/bubble";
import {Button} from "@/components/ui/button";
import {CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton} from "@/components/ui/code-block";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/input-group";
import {Message, MessageAvatar, MessageContent, MessageHeader} from "@/components/ui/message";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";

const recents = [
  "Pro AI components showcase",
  "Quick recipes for dinner",
  "Launch plan for Q3 rollout",
  "Rewrite homepage value prop",
  "Weekly team update summary",
];

const models = [
  {label: "GPT-5.4", value: "gpt-5.4"},
  {label: "Claude 4.6 Opus", value: "claude-4.6-opus"},
  {label: "Claude 4.6 Sonnet", value: "claude-4.6-sonnet"},
  {label: "Gemini 3.1 Pro", value: "gemini-3.1-pro"},
];

const snippet = 'export type ChatStatus = "ready" | "streaming" | "submitted";';

export function ChatTemplate() {
  const [active, setActive] = useState(recents[0]);

  return (
    <div className="flex h-full min-h-0 w-full bg-background text-sm">
      <aside className="flex w-56 shrink-0 flex-col gap-1 p-3 max-md:hidden">
        <div className="mb-3 flex items-center gap-2 px-1">
          <Avatar>
            <AvatarFallback className="bg-primary-soft text-primary-soft-foreground">DH</AvatarFallback>
          </Avatar>
          <div className="min-w-0 leading-tight">
            <p className="truncate font-medium">Darnell Howe</p>
            <p className="truncate text-muted-foreground text-xs">darnell@email.com</p>
          </div>
        </div>
        <Button className="w-full justify-start" size="sm" variant="ghost">
          <SquarePenIcon data-icon="inline-start" />
          New Chat
        </Button>
        <Button className="w-full justify-start" size="sm" variant="ghost">
          <LibraryIcon data-icon="inline-start" />
          Library
        </Button>
        <Button className="w-full justify-start" size="sm" variant="ghost">
          <CompassIcon data-icon="inline-start" />
          Explore
        </Button>
        <Separator className="my-2" />
        <p className="px-3 text-muted-foreground text-xs">Recent</p>
        {recents.map((title) => (
          <Button
            key={title}
            className="w-full justify-start"
            size="sm"
            variant={title === active ? "secondary" : "ghost"}
            onClick={() => setActive(title)}
          >
            <MessageSquareIcon data-icon="inline-start" />
            <span className="truncate">{title}</span>
          </Button>
        ))}
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div>
            <h2 className="font-semibold">{active}</h2>
            <p className="text-muted-foreground text-xs">Updated just now</p>
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="tertiary">
              <SearchIcon data-icon="inline-start" />
              Search
            </Button>
            <Button size="sm">
              <ShareIcon data-icon="inline-start" />
              Share
            </Button>
          </div>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-4">
            <Message align="end">
              <MessageContent>
                <Bubble>
                  <BubbleContent>Walk me through the HeroUI Pro AI chat components.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message>
              <MessageAvatar>
                <Avatar size="sm">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>Thought for 4 seconds</MessageHeader>
                <Bubble variant="ghost">
                  <BubbleContent>
                    Here is a concise answer with markdown support:
                    <CodeBlock className="mt-2" size="sm">
                      <CodeBlockActions>
                        <CodeBlockCopyButton value={snippet} />
                      </CodeBlockActions>
                      <CodeBlockContent>{snippet}</CodeBlockContent>
                    </CodeBlock>
                    <ul className="mt-2 list-disc ps-4 text-sm">
                      <li>Presentation-only Pro components</li>
                      <li>Your app owns the message array and SDK wiring</li>
                      <li>Compose ChatMessage, Markdown, and ChainOfThought explicitly</li>
                    </ul>
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageContent>
                <Bubble>
                  <BubbleContent>Show me reasoning, markdown, and code highlighting.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </div>
        </ScrollArea>
        <div className="px-4 pb-4">
          <div className="mx-auto max-w-2xl">
            <InputGroup variant="secondary">
              <InputGroupInput aria-label="Message input" placeholder="What do you want to know?" />
              <InputGroupAddon align="block-end">
                <Button aria-label="Attach file" size="icon-xs" variant="ghost">
                  <PaperclipIcon />
                </Button>
                <Select defaultValue="gpt-5.4" items={models}>
                  <SelectTrigger aria-label="Model" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {models.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <InputGroupButton aria-label="Send message" className="ms-auto" size="icon-xs">
                  <ArrowUpIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <p className="mt-2 text-center text-muted-foreground text-xs">AI can make mistakes. Check important info.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
