import { cn } from "~/lib/utils";

interface HeroProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Hero({ title, subtitle, className }: HeroProps) {
  return (
    <div
      className={cn(
        "flex flex-col py-20 items-center rounded-md bg-linear-to-t from-background to-primary/10",
        className
      )}
    >
      <h1 className="text-5xl font-bold">{title}</h1>
      {subtitle && <p className="text-2xl font-light text-foreground">{subtitle}</p>}
    </div>
  );
}
