import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { homeAnchors, themes, WHATSAPP } from "@/data/site";
import { btnPrimary } from "./ui";

export function Logo() {
  return (
    <Link to="/" className="font-display text-xl font-bold tracking-tight md:text-2xl">
      Pandit<span className="text-primary">RealEstate</span>
    </Link>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-primary" />;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const linkCls = "text-sm font-medium text-foreground/80 transition-colors hover:text-primary";
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "glass py-3" : "py-5"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/" className={linkCls} activeOptions={{ exact: true, includeHash: false }} activeProps={{ className: "text-primary" }}>
            Home
          </Link>
          <Link to="/about" className={linkCls} activeProps={{ className: "text-primary" }}>
            About
          </Link>
          {homeAnchors.map((a) => (
            <Link key={a.hash} to="/" hash={a.hash} className={linkCls}>
              {a.label}
            </Link>
          ))}
        </nav>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden lg:block">
          <Link to="/" hash="contact" className={btnPrimary}>
            Free Consultation
          </Link>
        </motion.div>
        <button aria-label="Menu" className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass mx-4 mt-3 overflow-hidden rounded-2xl lg:hidden"
          >
            <div className="flex flex-col gap-4 p-6" onClick={() => setOpen(false)}>
              <Link to="/" className={linkCls}>Home</Link>
              <Link to="/about" className={linkCls}>About</Link>
              {homeAnchors.map((a) => (
                <Link key={a.hash} to="/" hash={a.hash} className={linkCls}>{a.label}</Link>
              ))}
              <Link to="/" hash="contact" className={btnPrimary}>Free Consultation</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-foreground shadow-elegant"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("emerald");
  useEffect(() => {
    const saved = localStorage.getItem("pre-theme");
    if (saved) apply(saved);
  }, []);
  function apply(id: string) {
    document.documentElement.dataset["theme"] = id;
    localStorage.setItem("pre-theme", id);
    setActive(id);
  }
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="glass absolute bottom-16 left-0 w-56 rounded-2xl p-3"
          >
            <p className="px-2 pb-2 text-xs uppercase tracking-widest text-muted-foreground">Theme</p>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => apply(t.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm transition-colors hover:bg-foreground/10 ${active === t.id ? "bg-foreground/10" : ""}`}
              >
                <span className="flex">
                  {t.swatch.map((c) => (
                    <span key={c} className="-mr-1.5 h-5 w-5 rounded-full border border-foreground/30" style={{ background: c }} />
                  ))}
                </span>
                <span className="ml-2">{t.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        aria-label="Change theme"
        whileHover={{ rotate: 20, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="glass grid h-12 w-12 place-items-center rounded-full text-xl shadow-elegant"
      >
        🎨
      </motion.button>
    </div>
  );
}

export function CursorRing() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHover(!!(e.target as HTMLElement).closest("a,button,[role=button],select,input,textarea"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  if (!enabled) return null;
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border-2 border-primary"
      animate={{ x: pos.x - (hover ? 24 : 14), y: pos.y - (hover ? 24 : 14), width: hover ? 48 : 28, height: hover ? 48 : 28, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.4 }}
    />
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-5 pb-10 pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-muted-foreground">
            Delhi-NCR's trusted property consultants — verified properties, transparent pricing, lifelong support.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
          <ul className="grid grid-cols-2 gap-2 text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            {homeAnchors.map((a) => (
              <li key={a.hash}><Link to="/" hash={a.hash} className="hover:text-primary">{a.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-semibold">Visit Us</h4>
          <p className="text-muted-foreground">
            M-24, Greater Kailash II, New Delhi 110048
            <br />+91 99999 99999
            <br />hello@panditrealestate.in
          </p>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-border pt-6 text-center text-sm text-muted-foreground">
        © 2026 PanditRealEstate. All rights reserved.
      </p>
    </footer>
  );
}

export function LovableFloatButton() {
  return (
    <motion.a
      href="https://lovable.dev"
      target="_blank"
      rel="noreferrer"
      aria-label="Built with Lovable"
      whileHover={{scale: 1.1}}
      whileTap={{scale: 0.9}}
      initial={{scale: 0}}
      animate={{scale: 1}}
      transition={{delay: 1.2, type: "spring"}}
      className="fixed bottom-24 right-6 z-50 hidden lg:flex items-center gap-2 rounded-full bg-background/80 backdrop-blur border border-border px-3 py-2 text-xs font-medium text-muted-foreground shadow-elegant hover:text-primary hover:border-primary transition-colors"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="8" fill="#18181b" />
        <path
          d="M20 8L32 28H8L20 8Z"
          fill="#a78bfa"
        />
      </svg>
      Built with Lovable
    </motion.a>
  );
}
