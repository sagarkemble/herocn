export type ColorToken = {
  name: string;
  fg?: string;
};

export type ColorTokenGroup = {
  id: string;
  title: string;
  note?: string;
  tokens: ColorToken[];
};

export const colorTokenGroups: ColorTokenGroup[] = [
  {
    id: "primitives",
    title: "Primitives",
    note: "Declared on :root only. Dark mode does not redefine them.",
    tokens: [{name: "--snow"}, {name: "--eclipse"}],
  },
  {
    id: "canvas",
    title: "Canvas",
    tokens: [
      {name: "--background", fg: "--foreground"},
      {name: "--foreground"},
      {name: "--border"},
      {name: "--ring"},
    ],
  },
  {
    id: "surfaces",
    title: "Surfaces",
    note: "--card and --popover equal --surface.",
    tokens: [
      {name: "--surface", fg: "--foreground"},
      {name: "--surface-secondary", fg: "--foreground"},
      {name: "--surface-tertiary", fg: "--foreground"},
      {name: "--segment", fg: "--segment-foreground"},
      {name: "--muted", fg: "--muted-foreground"},
    ],
  },
  {
    id: "brand",
    title: "Brand and default",
    note: "HeroUI --accent is herocn --primary. shadcn --accent is a grey hover fill, not the brand colour.",
    tokens: [
      {name: "--primary", fg: "--primary-foreground"},
      {name: "--default", fg: "--default-foreground"},
      {name: "--secondary", fg: "--secondary-foreground"},
      {name: "--accent", fg: "--accent-foreground"},
    ],
  },
  {
    id: "status",
    title: "Status",
    tokens: [
      {name: "--success", fg: "--success-foreground"},
      {name: "--warning", fg: "--warning-foreground"},
      {name: "--destructive", fg: "--destructive-foreground"},
    ],
  },
  {
    id: "soft",
    title: "Soft mixes",
    tokens: [
      {name: "--default-soft", fg: "--default-soft-foreground"},
      {name: "--primary-soft", fg: "--primary-soft-foreground"},
      {name: "--success-soft", fg: "--success-soft-foreground"},
      {name: "--warning-soft", fg: "--warning-soft-foreground"},
      {name: "--destructive-soft", fg: "--destructive-soft-foreground"},
    ],
  },
  {
    id: "field",
    title: "Field fill",
    note: "--input is a background, not a border colour. Do not use border-input as a stroke.",
    tokens: [{name: "--input", fg: "--foreground"}],
  },
];

export const radiusTokens = [
  "--radius",
  "--radius-xs",
  "--radius-sm",
  "--radius-md",
  "--radius-lg",
  "--radius-xl",
  "--radius-2xl",
  "--radius-3xl",
  "--radius-4xl",
] as const;
