"use client";

/**
 * Live preview: the same demo grid as heroui.com/themes (HeroUI apps/docs/src/components/demo/*),
 * built only from our components/ui. Photos are local gradient stand-ins (no heroui.com assets).
 */
import {
  BadgeCheckIcon,
  CommandIcon,
  FileEditIcon,
  FilePlusIcon,
  InfoIcon,
  MailIcon,
  MessageSquareIcon,
  SaveIcon,
  Trash2Icon,
  UserIcon,
  XIcon,
  ArrowBigUpIcon,
} from "lucide-react";
import {siApple, siGoogle} from "simple-icons";
import {useState} from "react";

import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Field, FieldDescription, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle} from "@/components/ui/item";
import {Kbd} from "@/components/ui/kbd";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {Slider} from "@/components/ui/slider";
import {Spinner} from "@/components/ui/spinner";
import {Surface} from "@/components/ui/surface";
import {Switch} from "@/components/ui/switch";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";

import {t} from "./strings";

const d = t.demos;

/** Local gradient "photo" stand-in. */
function photo(a: string, b: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><defs><radialGradient id='g' cx='30%' cy='25%' r='90%'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></radialGradient></defs><rect width='80' height='80' fill='url(#g)'/></svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
const PHOTOS = {
  black: photo("#6b7280", "#111827"),
  blue: photo("#93c5fd", "#2563eb"),
  green: photo("#86efac", "#16a34a"),
  orange: photo("#fdba74", "#ea580c"),
  purple: photo("#d8b4fe", "#7c3aed"),
  red: photo("#fca5a5", "#dc2626"),
  demo1: photo("#fde68a", "#f59e0b"),
  demo2: photo("#a5f3fc", "#0891b2"),
};

function SimpleIcon({icon}: {icon: {path: string; title: string}}) {
  return (
    <svg aria-hidden fill="currentColor" role="img" viewBox="0 0 24 24">
      <path d={icon.path} />
    </svg>
  );
}

export function DemoComponents() {
  return (
    <div className="mx-auto grid w-fit grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[auto_auto_auto]">
      <div className="order-2 flex max-w-[360px] flex-col items-center gap-10 md:order-1">
        <TextfieldDemo />
        <SelectDemo />
        <UIComponentsDemo />
        <SliderDemo />
        <TabsDemo1 />
        <TabsDemo2 />
        <ListBoxDemo />
      </div>
      <div className="order-1 flex max-w-[360px] flex-col items-center gap-10 md:order-2">
        <AvatarGroupDemo />
        <InputOTPDemo />
        <ButtonsDemo />
        <XProfileDemo />
        <AlertDemo />
        <AllowNotificationsDemo />
      </div>
      <div className="order-3 col-span-1 grid grid-cols-1 grid-rows-2 justify-items-center gap-5 self-start md:col-span-2 md:grid-cols-2 md:grid-rows-[auto_auto] lg:col-span-1 lg:max-w-[360px] lg:grid-cols-1">
        <div className="row-span-2">
          <LoginDemo />
        </div>
        <div className="w-full self-start">
          <SubtleCardsDemo />
        </div>
        <AlertDialogDemo />
      </div>
    </div>
  );
}

function TextfieldDemo() {
  return (
    <Field className="w-[256px] items-start">
      <FieldLabel htmlFor="demo-email">
        {d.textfield.label}
        <span aria-hidden className="text-destructive">
          *
        </span>
      </FieldLabel>
      <Input required className="w-[256px]" id="demo-email" placeholder={d.textfield.placeholder} type="email" />
      <FieldDescription>{d.textfield.description}</FieldDescription>
    </Field>
  );
}

function SelectDemo() {
  return (
    <Field className="w-[256px]">
      <FieldLabel>
        {d.select.label}
        <span aria-hidden className="text-destructive">
          *
        </span>
      </FieldLabel>
      <Select items={d.select.options.map((o) => ({label: o, value: o}))}>
        <SelectTrigger className="w-full justify-between">
          <SelectValue placeholder={d.select.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {d.select.options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

function UIComponentsDemo() {
  return (
    <div className="flex w-full items-center justify-center gap-8">
      <Checkbox defaultChecked aria-label="Checkbox Indicator Example" />
      <Switch defaultChecked aria-label="Switch On State Example" />
      <RadioGroup aria-label="Radio Buttons Example" className="flex flex-row gap-8" defaultValue="option2" name="demo">
        <RadioGroupItem aria-label="Option 1" value="option1" />
        <RadioGroupItem aria-label="Option 2" value="option2" />
      </RadioGroup>
      <Spinner />
    </div>
  );
}

function SliderDemo() {
  const [value, setValue] = useState(250);

  return (
    <div className="flex w-[256px] flex-col gap-2 px-1">
      <div className="flex items-center justify-between">
        <Label id="demo-price">{d.slider.label}</Label>
        <output className="font-medium text-sm">
          {new Intl.NumberFormat("en-US", {currency: "USD", style: "currency"}).format(value)}
        </output>
      </div>
      <Slider
        aria-labelledby="demo-price"
        max={500}
        min={0}
        step={10}
        value={value}
        onValueChange={(v) => setValue(Array.isArray(v) ? (v[0] ?? 0) : (v as number))}
      />
    </div>
  );
}

function TabsDemo1() {
  return (
    <Tabs className="w-[256px]" defaultValue="1d">
      <TabsList aria-label={d.tabs1.ariaLabel}>
        {["1D", "7D", "1M", "1Y"].map((x) => (
          <TabsTrigger key={x} value={x.toLowerCase()}>
            {x}
          </TabsTrigger>
        ))}
        <TabsTrigger value="all">{d.tabs1.all}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function TabsDemo2() {
  return (
    <Tabs className="w-[256px]" defaultValue="chats">
      <TabsList aria-label={d.tabs2.ariaLabel}>
        <TabsTrigger value="chats">
          <MessageSquareIcon />
          <span>{d.tabs2.chats}</span>
        </TabsTrigger>
        <TabsTrigger value="emails">
          <MailIcon />
          <span>{d.tabs2.emails}</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function ListRow({
  icon,
  title,
  description,
  keys,
  danger,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  keys: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <Item className="items-start rounded-2xl hover:bg-default" render={<div role="option" aria-selected={false} tabIndex={-1} />} size="sm" variant="transparent">
      <ItemMedia className={danger ? "text-destructive" : "text-muted-foreground"}>{icon}</ItemMedia>
      <ItemContent>
        <ItemTitle className={danger ? "text-destructive" : undefined}>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Kbd variant="light">{keys}</Kbd>
      </ItemActions>
    </Item>
  );
}

function ListBoxDemo() {
  return (
    <Surface aria-label={d.listBox.ariaLabel} className="w-[256px] rounded-3xl p-2 shadow-sm" role="listbox">
      <p className="px-2 pt-1 pb-1 font-medium text-muted-foreground text-xs">{d.listBox.actions}</p>
      <ListRow
        description={d.listBox.newFileDescription}
        icon={<FilePlusIcon />}
        keys={<><CommandIcon />N</>}
        title={d.listBox.newFile}
      />
      <ListRow
        description={d.listBox.editFileDescription}
        icon={<FileEditIcon />}
        keys={<><CommandIcon />E</>}
        title={d.listBox.editFile}
      />
      <Separator className="my-1" />
      <p className="px-2 pt-1 pb-1 font-medium text-muted-foreground text-xs">{d.listBox.dangerZone}</p>
      <ListRow
        danger
        description={d.listBox.deleteFileDescription}
        icon={<Trash2Icon />}
        keys={<><CommandIcon /><ArrowBigUpIcon />D</>}
        title={d.listBox.deleteFile}
      />
    </Surface>
  );
}

function AvatarGroupDemo() {
  const avatars = [
    ["Blue", PHOTOS.blue],
    ["Green", PHOTOS.green],
    ["Purple", PHOTOS.purple],
    ["Orange", PHOTOS.orange],
    ["red", PHOTOS.red],
  ] as const;

  return (
    <div className="flex w-full justify-center">
      <AvatarGroup>
        {avatars.map(([name, src], i) => (
          <Avatar key={i}>
            <AvatarImage alt={name} src={src} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+2</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}

function InputOTPDemo() {
  const [value, setValue] = useState("4320");

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-[280px] flex-col items-start justify-center gap-2">
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="demo-otp">{d.inputOtp.label}</Label>
          <p className="text-muted-foreground text-sm">{d.inputOtp.description}</p>
        </div>
        <InputOTP id="demo-otp" maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="flex items-center gap-[5px] px-1 pt-1">
          <p className="text-muted-foreground text-sm">{d.inputOtp.didntReceive}</p>
          <a className="font-medium text-foreground text-sm hover:opacity-80" href="#" onClick={(e) => e.preventDefault()}>
            {d.inputOtp.resend}
          </a>
        </div>
      </div>
    </div>
  );
}

function ButtonsDemo() {
  const label = d.buttons.clickMe;

  return (
    <div className="grid grid-cols-3 gap-x-3 gap-y-2">
      <Button size="sm">{label}</Button>
      <Button size="sm" variant="secondary">
        {label}
      </Button>
      <Button size="sm" variant="tertiary">
        {label}
      </Button>
      <Button size="sm" variant="destructive">
        {label}
      </Button>
      <Button size="sm" variant="destructive-soft">
        {label}
      </Button>
      <Button size="sm" variant="ghost">
        {label}
      </Button>
    </div>
  );
}

function XProfileDemo() {
  return (
    <Card className="w-full items-start justify-center xl:w-[400px]">
      <CardHeader className="w-full">
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarFallback className="bg-foreground font-semibold text-background">H</AvatarFallback>
          </Avatar>
          <div className="flex h-full flex-col items-start justify-center">
            <div className="flex items-center gap-0.5">
              <span className="font-semibold text-sm leading-4">HeroUI</span>
              <BadgeCheckIcon className="size-[18px] fill-primary text-primary-foreground" />
            </div>
            <span className="text-muted-foreground text-sm tracking-tight">@hero_ui</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-start">
        <p className="ps-px font-medium text-sm">
          {d.xProfile.bio}&nbsp;
          <br />
          <span aria-label={d.xProfile.confettiLabel} role="img">
            🚀
          </span>
          &nbsp;{d.xProfile.bioSuffix}&nbsp;
        </p>
      </CardContent>
      <CardFooter className="gap-2 pb-4">
        <div className="flex gap-1">
          <p className="font-semibold text-sm">4</p>
          <p className="text-muted-foreground text-sm">{d.xProfile.following}</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-sm">97.1K</p>
          <p className="text-muted-foreground text-sm">{d.xProfile.followers}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

function AlertDemo() {
  return (
    <Alert className="w-full items-center xl:w-[400px]" variant="primary">
      <InfoIcon />
      <AlertTitle className="leading-5">{d.alert.title}</AlertTitle>
      <AlertDescription className="text-xs">{d.alert.description}</AlertDescription>
      <Button className="absolute end-3 top-1/2 -translate-y-1/2" variant="tertiary">
        {d.alert.action}
      </Button>
    </Alert>
  );
}

function AllowNotificationsDemo() {
  return (
    <div className="flex w-full justify-center">
      <label className="flex cursor-pointer gap-8 p-4" htmlFor="demo-notifications">
        <div className="-mt-0.5 flex flex-col justify-start gap-1">
          <span className="w-fit font-medium text-sm">{d.allowNotifications.label}</span>
          <span className="text-muted-foreground text-sm">{d.allowNotifications.description}</span>
        </div>
        <Switch defaultChecked id="demo-notifications" />
      </label>
    </div>
  );
}

function LoginDemo() {
  return (
    <Card className="w-[320px] max-w-full items-start justify-center p-5">
      <CardHeader className="flex w-full flex-col items-center justify-center gap-2">
        <Avatar>
          <AvatarFallback>
            <UserIcon className="size-5" />
          </AvatarFallback>
        </Avatar>
        <CardTitle>{d.login.title}</CardTitle>
        <Button aria-label="Close" className="absolute end-3 top-3" size="icon-xs" variant="ghost">
          <XIcon />
        </Button>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-2">
        <p className="text-balance text-center font-medium text-muted-foreground text-sm">{d.login.trialNote}</p>
        <Button className="w-full">{d.login.getStarted}</Button>
        <div className="flex w-full items-center gap-2 py-2">
          <Separator className="flex-1" />
          <p className="text-center font-medium text-muted-foreground text-xs uppercase">{d.login.or}</p>
          <Separator className="flex-1" />
        </div>
        <Button className="w-full" variant="tertiary">
          <SimpleIcon icon={siGoogle} />
          {d.login.continueWithGoogle}
        </Button>
        <Button className="w-full" variant="tertiary">
          <SimpleIcon icon={siApple} />
          {d.login.continueWithApple}
        </Button>
      </CardContent>
    </Card>
  );
}

function SubtleCard({title, members, by, img, byImg}: {title: string; members: string; by: string; img: string; byImg: string}) {
  return (
    <Card className="w-full flex-1">
      <CardHeader>
        <Avatar className="size-[56px] rounded-xl after:rounded-xl">
          <AvatarImage alt={title} className="rounded-xl" src={img} />
          <AvatarFallback className="rounded-xl">{title[0]}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="flex flex-col items-start">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-muted-foreground text-sm">{members}</p>
      </CardContent>
      <CardFooter className="items-center gap-2 pb-4">
        <Avatar className="size-4">
          <AvatarImage alt={by} src={byImg} />
          <AvatarFallback>{by[3]}</AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground text-xs">{by}</p>
      </CardFooter>
    </Card>
  );
}

function SubtleCardsDemo() {
  return (
    <div className="flex w-full flex-row flex-wrap justify-between gap-4">
      <SubtleCard by={d.subtleCards.indieBy} byImg={PHOTOS.red} img={PHOTOS.demo1} members={d.subtleCards.indieMembers} title={d.subtleCards.indieTitle} />
      <SubtleCard by={d.subtleCards.aiBy} byImg={PHOTOS.blue} img={PHOTOS.demo2} members={d.subtleCards.aiMembers} title={d.subtleCards.aiTitle} />
    </div>
  );
}

function AlertDialogDemo() {
  return (
    <Card className="h-[208px] w-full items-start justify-center p-5 min-[1200px]:w-[340px]">
      <CardHeader className="flex w-full flex-col items-start justify-center gap-2 px-1">
        <Avatar>
          <AvatarFallback className="bg-warning-soft text-warning-soft-foreground">
            <SaveIcon className="size-[18px]" />
          </AvatarFallback>
        </Avatar>
        <CardTitle>{d.alertDialog.title}</CardTitle>
        <CardDescription>{d.alertDialog.description}</CardDescription>
        <Button aria-label="Close" className="absolute end-3 top-3" size="icon-xs" variant="ghost">
          <XIcon />
        </Button>
      </CardHeader>
      <CardFooter className="flex w-full items-center gap-2 px-0.5 pt-3 pb-0">
        <Button className="flex-1" variant="tertiary">
          {d.alertDialog.discard}
        </Button>
        <Button className="flex-1">{d.alertDialog.save}</Button>
      </CardFooter>
    </Card>
  );
}
