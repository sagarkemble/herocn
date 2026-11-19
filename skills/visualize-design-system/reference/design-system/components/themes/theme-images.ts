import type {StaticImageData} from "next/image";

import airbnb from "@/app/design-system/assets/airbnb.png";
import black from "@/app/design-system/assets/black.png";
import coinbase from "@/app/design-system/assets/coinbase.png";
import defaultImg from "@/app/design-system/assets/default.png";
import discord from "@/app/design-system/assets/discord.png";
import lavender from "@/app/design-system/assets/lavender.png";
import mint from "@/app/design-system/assets/mint.png";
import netflix from "@/app/design-system/assets/netflix.png";
import rabbit from "@/app/design-system/assets/rabbit.png";
import sky from "@/app/design-system/assets/sky.png";
import spotify from "@/app/design-system/assets/spotify.png";

/** Preset thumbnails, copied from HeroUI apps/docs/src/assets/themes @ 08d4f13 (Apache-2.0), byte-identical; plain gradients, no logos. */
export const themeImages: Record<string, StaticImageData> = {
  airbnb,
  black,
  coinbase,
  default: defaultImg,
  discord,
  lavender,
  mint,
  netflix,
  rabbit,
  sky,
  spotify,
};
