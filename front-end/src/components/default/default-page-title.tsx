import { cn } from "@/lib/utils";

export function DefaultPageTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex-container", className)}>
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  );
}
