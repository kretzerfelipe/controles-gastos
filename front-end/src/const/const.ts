export const COLOR_CLASSES: Record<string, string> = {
  red: "bg-red-900",
  orange: "bg-orange-800",
  yellow: "bg-yellow-700",
  green: "bg-green-800",
  blue: "bg-blue-800",
  purple: "bg-purple-900",
  pink: "bg-pink-800",
  gray: "bg-gray-700",
  stone: "bg-stone-700",
  black: "bg-black",
} as const;

export const ICON_CLASSES: Record<string, string> = {
  money: "dollar-sign",
  food: "utensils",
  transport: "bus-front",
  house: "house",
  health: "heart-plus",
  education: "graduation-cap",
  entertainment: "gamepad-2",
  travel: "plane",
  other: "more-horizontal",
} as const;
