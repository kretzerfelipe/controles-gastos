import { ICON_CLASSES, type IconClasses } from "@/const/const";
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
  icon: IconClasses;
} & LucideProps;

export function defaultIconName(icon: IconClasses) {
  if (icon === ICON_CLASSES.money) return "Dinheiro";
  if (icon === ICON_CLASSES.food) return "Comida";
  if (icon === ICON_CLASSES.transport) return "Tranporte";
  if (icon === ICON_CLASSES.house) return "Casa";
  if (icon === ICON_CLASSES.health) return "Saúde";
  if (icon === ICON_CLASSES.education) return "Educação";
  if (icon === ICON_CLASSES.entertainment) return "Entretenimento";
  if (icon === ICON_CLASSES.travel) return "Viagem";
  if (icon === ICON_CLASSES.other) return "Outros";
}

export function DefaultIcon({ icon, ...props }: DefaultIconProps) {
  if (icon === ICON_CLASSES.money) return <DollarSign {...props} />;
  if (icon === ICON_CLASSES.food) return <Utensils {...props} />;
  if (icon === ICON_CLASSES.transport) return <BusFront {...props} />;
  if (icon === ICON_CLASSES.house) return <House {...props} />;
  if (icon === ICON_CLASSES.health) return <HeartPlus {...props} />;
  if (icon === ICON_CLASSES.education) return <GraduationCap {...props} />;
  if (icon === ICON_CLASSES.entertainment) return <Gamepad2 {...props} />;
  if (icon === ICON_CLASSES.travel) return <Plane {...props} />;
  if (icon === ICON_CLASSES.other) return <MoreHorizontal {...props} />;
}
