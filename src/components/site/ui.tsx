import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-colors hover:bg-primary-soft";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-foreground/25 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary";
export const btnBrand =
  "inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-surface transition-opacity hover:opacity-90";

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  tone = "dark",
  className,
  children,
}: {
  id?: string;
  tone?: "dark" | "light";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20 px-5 py-24 md:py-32",
        tone === "light" ? "bg-surface text-surface-foreground" : "bg-background text-foreground",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  accent: string;
  sub?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      <span
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.3em]",
          tone === "light" ? "text-brand" : "text-primary",
        )}
      >
        {eyebrow}
      </span>
      <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
        {title} <span className={tone === "light" ? "text-brand italic" : "text-shimmer italic"}>{accent}</span>
      </h2>
      {sub && (
        <p className={cn("mt-5 text-lg", tone === "light" ? "text-surface-foreground/70" : "text-muted-foreground")}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(value);
    const c = animate(0, value, { duration: 2, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduce]);
  return (
    <span ref={ref}>
      {n.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}
