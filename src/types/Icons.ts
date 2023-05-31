export const ICONS = [
    "black_panther",
    "black_widow",
    "captain_america",
    "cyclops",
    "groot",
    "hulk",
    "iron_man",
    "rocket",
    "scarlet_witch",
    "spider_gwen",
    "wolverine",
] as const;

export type IconType = (typeof ICONS)[number];
