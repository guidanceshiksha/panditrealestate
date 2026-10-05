import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { journey, stats, team, img } from "@/data/site";
import { btnPrimary, CountUp, fadeUp, initials, Reveal, Section, SectionHeading, stagger } from "@/components/site/ui";

const title = "About Us — PanditRealEstate";
const description =
  "Since 2014, PanditRealEstate has helped 850+ families across Delhi-NCR buy, sell and invest in property with honesty and care.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const pillars = [
  { icon: "🎯", title: "Mission", desc: "To make every property decision safe, simple and transparent for Indian families." },
  { icon: "🔭", title: "Vision", desc: "To be Delhi-NCR's most trusted name in real estate advice by 2030." },
  { icon: "💎", title: "Values", desc: "Honesty first, client before commission, and diligence in every document." },
];

function About() {
  return (
    <>
      <section className="relative overflow-hidden px-5 pb-24 pt-40">
        <img src={img("1486406146926-c627a92ad1ab", 1920)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            About Us
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-5 text-5xl font-bold leading-tight md:text-7xl">
            Building Trust, <span className="text-shimmer italic">One Property</span> at a Time
          </motion.h1>
        </div>
      </section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="space-y-5 text-lg text-muted-foreground">
            <h2 className="text-4xl font-bold text-foreground">Our <span className="text-primary italic">Story</span></h2>
            <p>PanditRealEstate began in 2014 in a small South Delhi office with one belief: buying a home should never feel like a gamble. Too many families were losing savings to unclear titles and inflated prices.</p>
            <p>Founder Rajesh Pandit built a consultancy around verification, honest pricing and personal care. Every property we recommend passes a rigorous legal and physical check.</p>
            <p>Today, our team of 40+ consultants, lawyers and loan experts serves clients across Delhi-NCR and NRIs in 12 countries — but our promise remains the same.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <img src={img("1600607687939-ce8a6c25118c")} alt="Our office" className="rounded-3xl shadow-elegant" />
          </Reveal>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-6 rounded-3xl border border-border bg-card p-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-bold text-primary md:text-5xl"><CountUp value={s.value} suffix={s.suffix} /></p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <SectionHeading tone="light" eyebrow="What Drives Us" title="Mission, Vision &" accent="Values" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <motion.div key={p.title} variants={fadeUp} whileHover={{ y: -8 }} className="rounded-3xl border-2 border-surface-border bg-surface p-8 transition-colors hover:border-primary">
              <span className="text-5xl">{p.icon}</span>
              <h3 className="mt-5 text-2xl font-bold">{p.title}</h3>
              <p className="mt-2 text-surface-foreground/70">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Milestones" title="Our" accent="Journey" />
        <div className="relative mx-auto max-w-2xl border-l-2 border-primary/40 pl-10">
          {journey.map((j, i) => (
            <motion.div key={j.year} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative mb-12 last:mb-0">
              <span className="absolute -left-[51px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary" />
              <span className="font-display text-3xl font-bold text-primary">{j.year}</span>
              <h3 className="mt-1 text-2xl font-bold">{j.title}</h3>
              <p className="mt-2 text-muted-foreground">{j.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <SectionHeading tone="light" eyebrow="Our Team" title="The People Behind" accent="Pandit" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <motion.div key={t.name} variants={fadeUp} whileHover={{ y: -8 }} className="rounded-3xl border border-surface-border bg-surface-muted p-8 text-center">
              <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-brand font-display text-3xl font-bold text-surface">{initials(t.name)}</span>
              <h3 className="mt-5 text-xl font-bold">{t.name}</h3>
              <p className="text-sm text-brand">{t.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <section className="bg-primary px-5 py-20 text-center text-primary-foreground">
        <Reveal>
          <h2 className="text-4xl font-bold md:text-5xl">Ready to find your perfect property?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg opacity-80">Your first consultation is completely free.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8 inline-block">
            <Link to="/" hash="contact" className={`${btnPrimary} bg-background text-foreground hover:bg-card`}>
              Book Free Consultation →
            </Link>
          </motion.div>
        </Reveal>
      </section>
    </>
  );
}
