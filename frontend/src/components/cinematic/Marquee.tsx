interface MarqueeProps {
  children: string;
  speed?: number;
  direction?: "left" | "right";
  variant?: "thin" | "massive";
  className?: string;
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  variant = "thin",
  className = "",
}: MarqueeProps) {
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  const textClass =
    variant === "massive"
      ? "text-6xl md:text-8xl font-bold tracking-tight text-on-surface/[0.06]"
      : "text-sm md:text-base font-medium tracking-[0.2em] uppercase text-on-surface-variant/40";

  const repeated = `${children} — `.repeat(12);

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div
        className={`inline-block ${animClass}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <span className={textClass}>{repeated}</span>
        <span className={textClass}>{repeated}</span>
      </div>
    </div>
  );
}
