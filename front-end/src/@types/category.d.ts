import type { ColorClasses, IconClasses } from "@/const/const";

export interface Category {
  _id: number;
  _name: string;
  _color: ColorClasses;
  _icon: IconClasses;
  _type: "income" | "expense";
}
