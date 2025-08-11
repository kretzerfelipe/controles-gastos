import type { ICON_CLASSES } from "@/const/const";
import {
  DollarSign,
  Utensils,
  BusFront,
  House,
  HeartPlus,
  GraduationCap,
  Gamepad2,
  Plane,
  MoreHorizontal,
  type LucideProps,
} from "lucide-react";

type DefaultIconProps = {
  icon: keyof typeof ICON_CLASSES;
} & LucideProps;

export function DefaultIcon({ icon, ...props }: DefaultIconProps) {
  if (icon === "money") return <DollarSign {...props} />;
  if (icon === "food") return <Utensils {...props} />;
  if (icon === "transport") return <BusFront {...props} />;
  if (icon === "house") return <House {...props} />;
  if (icon === "health") return <HeartPlus {...props} />;
  if (icon === "education") return <GraduationCap {...props} />;
  if (icon === "entertainment") return <Gamepad2 {...props} />;
  if (icon === "travel") return <Plane {...props} />;
  if (icon === "other") return <MoreHorizontal {...props} />;
}
