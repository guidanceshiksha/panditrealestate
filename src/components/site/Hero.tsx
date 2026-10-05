import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { heroSlides, rotatingWords, stats } from "@/data/site";
import { CountUp } from "./ui";

const tabs = ["Buy", "Rent", "Lease", "Sell"];
const SLIDE_MS = 5000;

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % rotatingWords.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-shimmer italic"
        >
          {rotatingWords[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function TiltCard({ slide }: { slide: (typeof heroSlides)[number] }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 15 });
  const chips = [
    { t: "✅ Verified Property", c: "-left-10 top-8", d: "0s" },
    { t: "🏦 Loan Approved", c: "-right-8 top-1/2", d: "1s" },
    { t: "📜 Registry Done", c: "-left-6 -bottom-5", d: "2s" },
  ];
  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="glass relative rounded-3xl p-4 shadow-elegant"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={slide.image}
              src={slide.image}
              alt={slide.name}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Featured
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-end justify-between gap-4 px-2 pb-1 pt-4"
            style={{ transform: "translateZ(40px)" }}
          >
            <div>
              <h3 className="text-2xl font-bold">{slide.name}</h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {slide.location}
              </p>
            </div>
            <p className="font-display text-2xl font-bold text-primary">{slide.price}</p>
          </motion.div>
        </AnimatePresence>
        {chips.map((c) => (
          <div
            key={c.t}
            className={`glass absolute ${c.c} animate-bob whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium shadow-elegant`}
            style={{ animationDelay: c.d, transform: "translateZ(60px)" }}
          >
            {c.t}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Hero() {
  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState("Buy");
  useEffect(() => {
    const t = setTimeout(() => setIdx((v) => (v + 1) % heroSlides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [idx]);
  const go = (d: number) => setIdx((v) => (v + d + heroSlides.length) % heroSlides.length);
  const headline = ["Find", "Your", "Dream"];
  const selectCls =
    "w-full rounded-xl border border-foreground/15 bg-background/60 px-3 py-3 text-sm text-foreground outline-none focus:border-primary";

  return (
    <section className="relative min-h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0"
        >
          <img src={heroSlides[idx].image} alt="" className="animate-kenburns h-full w-full object-cover" />
        </motion.div>
      </AnimatePresence>
      <div className="hero-overlay absolute inset-0" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-5 pb-40 pt-32 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-light inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Delhi-NCR's Trusted Property Consultants
          </motion.span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.08] md:text-7xl">
            {headline.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                className="mr-4 inline-block"
              >
                {w}
              </motion.span>
            ))}
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              <RotatingWord />
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="inline-block"
            >
              With Trust
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 max-w-xl text-lg text-foreground/80"
          >
            Verified homes, plots and commercial spaces across Delhi, Noida and Gurugram — with honest advice, legal
            safety and paperwork handled end to end.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="glass mt-8 rounded-2xl p-4 shadow-elegant"
          >
            <div className="mb-3 flex gap-1">
              {tabs.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium ${tab === t ? "text-primary-foreground" : "text-foreground/80"}`}
                >
                  {tab === t && (
                    <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-primary" />
                  )}
                  <span className="relative">{t}</span>
                </button>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <select className={selectCls} aria-label="Location">
                <option>Noida</option><option>Gurugram</option><option>Dwarka</option><option>South Delhi</option><option>Greater Noida</option>
              </select>
              <select className={selectCls} aria-label="Property type">
                <option>Apartment</option><option>Villa</option><option>Plot</option><option>Office</option><option>Builder Floor</option>
              </select>
              <select className={selectCls} aria-label="Budget">
                <option>₹50L – 1Cr</option><option>₹1Cr – 2Cr</option><option>₹2Cr – 5Cr</option><option>₹5Cr+</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Search className="h-4 w-4" /> Search
              </motion.button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25 }}
            className="mt-8 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {["RM", "PS", "AK", "NG"].map((a) => (
                <span key={a} className="grid h-10 w-10 place-items-center rounded-full border-2 border-background bg-primary text-xs font-bold text-primary-foreground">
                  {a}
                </span>
              ))}
            </div>
            <p className="text-sm">
              <span className="text-primary">★★★★★</span> <strong>4.9</strong> · 850+ happy families
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hidden lg:block"
        >
          <TiltCard slide={heroSlides[idx]} />
          <div className="mt-10 flex items-center gap-4">
            <button aria-label="Previous" onClick={() => go(-1)} className="glass grid h-10 w-10 place-items-center rounded-full hover:text-primary">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex flex-1 gap-2">
              {heroSlides.map((s, i) => (
                <button key={s.name} aria-label={`Slide ${i + 1}`} onClick={() => setIdx(i)} className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/20">
                  {i === idx && (
                    <motion.span
                      key={idx}
                      className="block h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                    />
                  )}
                  {i < idx && <span className="block h-full w-full bg-primary/60" />}
                </button>
              ))}
            </div>
            <button aria-label="Next" onClick={() => go(1)} className="glass grid h-10 w-10 place-items-center rounded-full hover:text-primary">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-28 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-foreground/50 pt-2">
          <span className="h-2 w-1 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
}

export function Stats() {
  return (
    <div className="relative z-10 -mt-20 px-5">
      <div className="glass mx-auto grid max-w-6xl grid-cols-2 gap-6 rounded-3xl bg-card/80 p-8 shadow-elegant md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-display text-4xl font-bold text-primary md:text-5xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Ticker() {
  const words = "BUY ✦ SELL ✦ RENT ✦ LEASE ✦ INVEST ✦ VALUATE ✦ REGISTER ✦ VERIFY ✦ MANAGE ✦ ";
  return (
    <div className="relative z-0 overflow-hidden py-16">
      <div className="-rotate-[1.6deg] scale-105 bg-primary py-4 text-primary-foreground">
        <div className="marquee flex w-max whitespace-nowrap font-display text-2xl font-bold tracking-wider">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="px-2">{words}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
