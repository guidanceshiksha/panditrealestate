import { AnimatePresence, motion } from "framer-motion";
import { BedDouble, ChevronDown, MapPin, Maximize, Quote, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  clients,
  faqs,
  gallery,
  process,
  properties,
  services,
  testimonials,
  whyUs,
} from "@/data/site";
import { btnBrand, btnPrimary, fadeUp, initials, Reveal, Section, SectionHeading, stagger } from "./ui";

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

/* ---------- Services ---------- */
function ServiceCard({ s, onOpen }: { s: (typeof services)[number]; onOpen: () => void }) {
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -8, rotate: -0.6 }}
      onMouseMove={onMove}
      onClick={onOpen}
      className="group relative overflow-hidden rounded-2xl border-2 border-surface-border bg-surface p-6 text-left transition-colors hover:border-primary"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: `radial-gradient(240px circle at ${spot.x}% ${spot.y}%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)`,
        }}
      />
      <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-surface-muted text-2xl transition-transform duration-700 group-hover:rotate-[360deg]">
        {s.icon}
      </span>
      <h3 className="relative mt-5 text-xl font-bold">{s.title}</h3>
      <p className="relative mt-2 text-base text-surface-foreground/70">{s.desc}</p>
      <span className="relative mt-4 inline-block text-sm font-semibold text-brand">Enquire now →</span>
    </motion.button>
  );
}

export function Services() {
  const [open, setOpen] = useState<(typeof services)[number] | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Mobile carousel state
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    setDragging(true);
    dragStartX.current = e.clientX;
    scrollStartX.current = trackRef.current.scrollLeft;
    trackRef.current.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !trackRef.current) return;
    trackRef.current.scrollLeft = scrollStartX.current - (e.clientX - dragStartX.current);
  };
  const onPointerUp = () => setDragging(false);

  // first row = 4 services; second row = next 4
  const row1 = services.slice(0, 4);
  const row2 = services.slice(4, 8);

  return (
    <Section id="services" tone="light">
      <SectionHeading
        tone="light"
        eyebrow="Our Services"
        title="Complete Real Estate"
        accent="Consultancy"
        sub="18 specialised services under one roof — from your first site visit to the final registry."
      />

      {/* ── Desktop grid (unchanged) ── */}
      <motion.div layout className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.title} s={s} onOpen={() => setOpen(s)} />
        ))}
      </motion.div>

      {/* ── Mobile carousel: 2 rows of 4, then View More ── */}
      <div className="sm:hidden">
        {/* Row 1 */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="no-scrollbar flex gap-4 overflow-x-auto pb-2 select-none"
          style={{ cursor: dragging ? "grabbing" : "grab" }}
        >
          {row1.map((s) => (
            <div key={s.title} className="w-[72vw] max-w-[260px] shrink-0">
              <ServiceCard s={s} onOpen={() => setOpen(s)} />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2 no-scrollbar select-none">
          {row2.map((s) => (
            <div key={s.title} className="w-[72vw] max-w-[260px] shrink-0">
              <ServiceCard s={s} onOpen={() => setOpen(s)} />
            </div>
          ))}
        </div>

        {/* View More button */}
        <div className="mt-6 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowAll(true)}
            className={`${btnPrimary} px-8 py-3`}
          >
            View More Services →
          </motion.button>
        </div>
      </div>

      {/* ── All Services full-screen modal (mobile View More) ── */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] overflow-y-auto bg-background p-5"
          >
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-background py-3 z-10 border-b border-border">
              <h2 className="text-2xl font-bold">All Services</h2>
              <button aria-label="Close" onClick={() => setShowAll(false)} className="rounded-full p-2 hover:bg-muted">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="grid gap-4 grid-cols-1">
              {services.map((s) => (
                <ServiceCard key={s.title} s={s} onOpen={() => { setShowAll(false); setOpen(s); }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Service detail modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-background/70 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-card p-8 text-card-foreground shadow-elegant"
            >
              <button aria-label="Close" onClick={() => setOpen(null)} className="absolute right-5 top-5 hover:text-primary">
                <X />
              </button>
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/15 text-3xl">{open.icon}</span>
              <span className="mt-5 inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                {open.category}
              </span>
              <h3 className="mt-3 text-3xl font-bold">{open.title}</h3>
              <p className="mt-3 text-muted-foreground">{open.desc}</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li>✦ Dedicated relationship manager</li>
                <li>✦ 100% verified, legally vetted process</li>
                <li>✦ Transparent fees shared upfront</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setOpen(null);
                  scrollToContact();
                }}
                className={`${btnPrimary} mt-7 w-full`}
              >
                Enquire Now
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ---------- Why us ---------- */
export function WhyUs() {
  return (
    <Section>
      <SectionHeading eyebrow="Why Choose Us" title="The Pandit" accent="Promise" sub="Six reasons 850+ families trust us with the biggest decision of their lives." />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.map((w) => (
          <motion.div
            key={w.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary"
          >
            <span className="text-4xl">{w.icon}</span>
            <h3 className="mt-5 text-2xl font-bold group-hover:text-primary">{w.title}</h3>
            <p className="mt-2 text-muted-foreground">{w.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ---------- Properties ---------- */
export function Properties() {
  return (
    <Section id="properties" tone="light">
      <SectionHeading tone="light" eyebrow="Featured Listings" title="Handpicked" accent="Properties" sub="Verified, ready-to-visit properties across Delhi-NCR's most sought-after localities." />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <motion.article
            key={p.title}
            variants={fadeUp}
            whileHover={{ y: -10 }}
            className="group overflow-hidden rounded-3xl border border-surface-border bg-surface shadow-sm transition-shadow hover:shadow-elegant"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{p.tag}</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-surface-foreground/70">
                <MapPin className="h-4 w-4" /> {p.location}
              </p>
              <div className="mt-4 flex gap-4 text-sm text-surface-foreground/70">
                {p.beds > 0 && (
                  <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {p.beds} Beds</span>
                )}
                <span className="flex items-center gap-1"><Maximize className="h-4 w-4" /> {p.area}</span>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-surface-border pt-4">
                <span className="font-display text-2xl font-bold text-brand">{p.price}</span>
                <button onClick={scrollToContact} className="text-sm font-semibold text-brand hover:underline">Details →</button>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

/* ---------- Process ---------- */
export function Process() {
  return (
    <Section>
      <SectionHeading eyebrow="How It Works" title="Four Simple" accent="Steps" />
      <div className="relative mx-auto max-w-4xl space-y-6">
        <div className="absolute left-1/2 top-0 hidden h-full w-px bg-border md:block" />
        {process.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, x: i % 2 ? 80 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className={`md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12"}`}
          >
            <div className="rounded-2xl border border-border bg-card p-7">
              <span className="font-display text-5xl font-bold text-shimmer">{p.n}</span>
              <h3 className="mt-3 text-2xl font-bold">{p.title}</h3>
              <p className="mt-2 text-muted-foreground">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Gallery ---------- */
export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Section id="gallery" tone="light">
      <SectionHeading tone="light" eyebrow="Gallery" title="Spaces We've" accent="Delivered" />
      <div className="columns-2 gap-4 md:columns-4">
        {gallery.map((g, i) => (
          <Reveal key={g} delay={(i % 4) * 0.08} className="mb-4 break-inside-avoid">
            <button onClick={() => setOpen(g)} className="group block w-full overflow-hidden rounded-2xl">
              <img
                src={g}
                alt={`Property ${i + 1}`}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
              />
            </button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-background/90 p-5 backdrop-blur"
          >
            <motion.img initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} src={open.replace("w=1200", "w=1920")} alt="" className="max-h-[85vh] rounded-2xl shadow-elegant" />
            <button aria-label="Close" className="absolute right-6 top-6 text-foreground"><X className="h-8 w-8" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ---------- Testimonials ---------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % testimonials.length), 5000);
    return () => clearTimeout(t);
  }, [i]);
  const t = testimonials[i]!;
  return (
    <Section>
      <SectionHeading eyebrow="Testimonials" title="Words From Our" accent="Families" />
      <div className="mx-auto max-w-3xl">
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-border bg-card p-10 text-center"
            >
              <Quote className="mx-auto h-10 w-10 text-primary" />
              <p className="mt-5 text-primary">★★★★★</p>
              <p className="mt-4 font-display text-2xl leading-relaxed">"{t.text}"</p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{initials(t.name)}</span>
                <div className="text-left">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((x, k) => (
            <button key={x.name} aria-label={`Review ${k + 1}`} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-2.5 bg-foreground/30"}`} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Clients ---------- */
export function Clients() {
  return (
    <section className="overflow-hidden bg-surface py-20 text-surface-foreground">
      <Reveal className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Our Clients & Partners</span>
      </Reveal>
      <div className="marquee flex w-max gap-6">
        {[...clients, ...clients].map((c, i) => (
          <span key={i} className="whitespace-nowrap rounded-2xl border border-surface-border bg-surface-muted px-10 py-5 font-display text-2xl font-bold text-surface-foreground/70">
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section>
      <SectionHeading eyebrow="FAQ" title="Questions," accent="Answered" />
      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.06}>
            <div className={`rounded-2xl border bg-card transition-colors ${open === i ? "border-primary" : "border-border"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-6 text-left text-lg font-semibold">
                {f.q}
                <motion.span animate={{ rotate: open === i ? 180 : 0 }}><ChevronDown className="text-primary" /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  const [sent, setSent] = useState(false);
  const field =
    "w-full rounded-xl border border-surface-border bg-surface-muted px-4 py-3 text-surface-foreground outline-none transition-colors focus:border-brand";
  return (
    <Section id="contact" tone="light">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Contact</span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Book Your Free <span className="italic text-brand">Consultation</span>
          </h2>
          <p className="mt-5 text-lg text-surface-foreground/70">
            Tell us what you're looking for. A senior consultant will call you back within 2 working hours.
          </p>
          <div className="mt-8 space-y-3 text-surface-foreground/80">
            <p>📞 +91 99999 99999</p>
            <p>✉️ hello@panditrealestate.in</p>
            <p>📍 M-24, Greater Kailash II, New Delhi</p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative min-h-[460px] rounded-3xl border border-surface-border bg-surface p-8 shadow-elegant">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.15 }} className="grid h-20 w-20 place-items-center rounded-full bg-brand text-4xl text-surface">
                    ✓
                  </motion.span>
                  <h3 className="mt-6 text-3xl font-bold">Thank you!</h3>
                  <p className="mt-2 text-surface-foreground/70">We've received your request and will call you shortly.</p>
                  <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-brand hover:underline">Send another</button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-4"
                >
                  <input required className={field} placeholder="Your name" />
                  <input required type="tel" className={field} placeholder="Phone number" />
                  <select required className={field} defaultValue="">
                    <option value="" disabled>Select a service</option>
                    {services.map((s) => <option key={s.title}>{s.title}</option>)}
                  </select>
                  <textarea rows={4} className={field} placeholder="Tell us about your requirement" />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${btnBrand} w-full py-4`}>
                    Book Free Consultation
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
