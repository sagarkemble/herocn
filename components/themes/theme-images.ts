import type {StaticImageData} from "next/image";

import airbnb from "@/app/themes/assets/airbnb.png";
import black from "@/app/themes/assets/black.png";
import coinbase from "@/app/themes/assets/coinbase.png";
import defaultImg from "@/app/themes/assets/default.png";
import discord from "@/app/themes/assets/discord.png";
import lavender from "@/app/themes/assets/lavender.png";
import mint from "@/app/themes/assets/mint.png";
import netflix from "@/app/themes/assets/netflix.png";
import rabbit from "@/app/themes/assets/rabbit.png";
import sky from "@/app/themes/assets/sky.png";
import spotify from "@/app/themes/assets/spotify.png";

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
