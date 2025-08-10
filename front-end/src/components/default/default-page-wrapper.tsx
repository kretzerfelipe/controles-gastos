import { cn } from "@/lib/utils";

export function DefaultPageWrapper({
  children,
  className,
  ...props
}: React.ComponentProps<"input"> & {
  children: React.ReactNode;
}) {
  return (
    <main
      className={cn(
        "flex-container min-h-dvh bg-background py-5 px-15",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
