export const COLOR_CLASSES = {
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

export type ColorClasses = (typeof COLOR_CLASSES)[keyof typeof COLOR_CLASSES];

export const ICON_CLASSES = {
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

export type IconClasses = (typeof ICON_CLASSES)[keyof typeof ICON_CLASSES];

export const ACCOUNT_TYPES = {
  CHECKING: "CONTA_CORRENTE",
  INVESTMENT: "INVESTIMENTO",
  VR_VA: "VALE_REFEICAO_ALIMENTACAO",
  CASH: "DINHEIRO_ESPECIE",
  SAVINGS: "POUPANCA",
} as const;

export type AccountType = (typeof ACCOUNT_TYPES)[keyof typeof ACCOUNT_TYPES];
