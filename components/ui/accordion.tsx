import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("group/accordion w-full [contain:layout_style]", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "relative border-none after:absolute after:start-0 after:bottom-0 after:h-px after:w-full after:rounded-xs after:bg-border last:after:content-none data-[hide-separator=true]:after:hidden",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 cursor-pointer select-none items-center justify-between px-4 py-4 text-start font-medium text-sm transition-shadow hover:bg-foreground/3 focus-visible:focus-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-70 aria-expanded:hover:bg-transparent",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="ms-auto size-4 shrink-0 text-muted-foreground transition-transform duration-250 group-aria-expanded/accordion-trigger:hidden motion-reduce:transition-none" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className="ms-auto hidden size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-clip opacity-0 transition-[height,opacity] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 data-open:opacity-100 motion-reduce:transition-none"
      {...props}
    >
      <div
        className={cn(
          "px-4 pt-0 pb-4 text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
