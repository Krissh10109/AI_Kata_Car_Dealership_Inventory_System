import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { PageLoader } from "../components/cinematic/PageLoader";
import { CustomCursor } from "../components/cinematic/CustomCursor";
import { Marquee } from "../components/cinematic/Marquee";
import { SplitText } from "../components/cinematic/SplitText";
import { MagneticButton } from "../components/cinematic/MagneticButton";

const SERVICES = [
  { num: "01", title: "FLEET INTELLIGENCE", desc: "Real-time valuation, market forecasting, and dynamic pricing models across your entire inventory." },
  { num: "02", title: "VALUATION ENGINE", desc: "AI-powered depreciation modeling and competitive market analysis for precision pricing." },
  { num: "03", title: "PIPELINE CONTROL", desc: "End-to-end acquisition and sales pipeline management with drag-and-drop workflow." },
  { num: "04", title: "FINANCING DESK", desc: "Automated loan calculations, instant PDF generation, and integrated approval routing." },
  { num: "05", title: "ANALYTICS & REPORTING", desc: "Deep operational insights with customizable dashboards and export capabilities." },
  { num: "06", title: "INVENTORY OPERATIONS", desc: "Full CRUD lifecycle management with role-based access and audit trails." },
];

export function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  const handleLoaderComplete = useCallback(() => setIsLoaded(true), []);

  if (!isLoaded) {
    return <PageLoader onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary/20 selection:text-on-surface">
      <CustomCursor />

      {/* ─── FIXED NAVIGATION ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 z-50 w-full">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-12">
          <Link to="/" className="font-display text-xl tracking-tight text-on-surface transition-opacity hover:opacity-70">
            DRIVEFLOW
          </Link>
          <div className="flex items-center gap-8">
            <Link
              to="/login"
              className="hidden text-[11px] font-semibold uppercase tracking-[0.15em] text-on-surface-variant transition-colors hover:text-on-surface md:block"
            >
              Sign In
            </Link>
            <MagneticButton>
              <Link
                to="/register"
                className="flex items-center gap-2 border border-outline px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-on-surface transition-all hover:border-primary hover:text-primary"
              >
                Enter Platform
                <span className="text-primary">→</span>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION (100vh) ─────────────────────────────────────────── */}
      <section className="relative flex h-screen flex-col justify-between overflow-hidden px-6 pt-20 md:px-12">
        {/* Top metadata row */}
        <motion.div
          className="mx-auto flex w-full max-w-[1400px] items-start justify-between pt-8"
          initial={!prefersReduced ? { opacity: 0 } : undefined}
          animate={!prefersReduced ? { opacity: 1 } : undefined}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
            Automotive Intelligence Platform
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
            © 2026
          </span>
        </motion.div>

        {/* Hero headline — asymmetric, massive */}
        <div className="mx-auto w-full max-w-[1400px] flex-1 flex items-center">
          <div className="w-full">
            <SplitText
              className="font-display text-display-hero-mobile md:text-display-hero leading-none tracking-tight text-on-surface"
              delay={0.3}
              stagger={0.1}
            >
              {`THE FUTURE\nOF AUTOMOTIVE\nINTELLIGENCE.`}
            </SplitText>

            <motion.p
              className="mt-8 max-w-[480px] text-body-lg leading-relaxed text-on-surface-variant"
              initial={!prefersReduced ? { opacity: 0, y: 20 } : undefined}
              animate={!prefersReduced ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Enterprise fleet management built for precision. Real-time inventory,
              AI valuation, and operational analytics — unified in one platform.
            </motion.p>
          </div>
        </div>

        {/* Bottom metadata row */}
        <motion.div
          className="mx-auto flex w-full max-w-[1400px] items-end justify-between pb-8"
          initial={!prefersReduced ? { opacity: 0 } : undefined}
          animate={!prefersReduced ? { opacity: 1 } : undefined}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
            <motion.span
              animate={!prefersReduced ? { y: [0, 4, 0] } : undefined}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
            Scroll to explore
          </div>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-primary md:block">
            Available for Enterprise
          </span>
        </motion.div>

        {/* Subtle background gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/[0.02] blur-[100px]" />
        </div>
      </section>

      {/* ─── STATEMENT SECTION ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 py-section md:px-12">
        <div className="divider-gold mb-section" />
        <motion.h2
          className="font-display text-display-lg md:text-display-xl leading-none tracking-tight text-on-surface"
          initial={!prefersReduced ? { opacity: 0, y: 60 } : undefined}
          whileInView={!prefersReduced ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          WE DON'T MANAGE
          <br />
          <span className="text-on-surface-variant">INVENTORY.</span>
          <br />
          WE COMMAND IT.
        </motion.h2>
      </section>

      {/* ─── MARQUEE ──────────────────────────────────────────────────────── */}
      <div className="py-12 space-y-4 overflow-hidden">
        <Marquee speed={25} direction="left" variant="massive">
          INVENTORY — ANALYTICS — FLEET — PRECISION — AUTOMOTIVE — INTELLIGENCE
        </Marquee>
        <Marquee speed={40} direction="right" variant="thin">
          VALUATION — PIPELINE — FINANCING — REPORTING — OPERATIONS — FORECASTING
        </Marquee>
      </div>

      {/* ─── SERVICES SECTION ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 py-section md:px-12">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
              What We Offer
            </span>
            <h2 className="mt-4 font-display text-display-sm md:text-display-lg tracking-tight text-on-surface">
              CAPABILITIES
            </h2>
          </div>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant md:block">
            06 Services
          </span>
        </div>

        <div className="border-t border-outline-variant">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.num}
              className="group flex cursor-pointer items-center justify-between border-b border-outline-variant py-8 transition-colors hover:border-primary/30 md:py-10"
              onMouseEnter={() => setHoveredService(i)}
              onMouseLeave={() => setHoveredService(null)}
              initial={!prefersReduced ? { opacity: 0, y: 30 } : undefined}
              whileInView={!prefersReduced ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-6 md:gap-12">
                <span className="text-[11px] font-semibold tracking-[0.15em] text-on-surface-variant transition-colors group-hover:text-primary">
                  {svc.num}
                </span>
                <div>
                  <h3
                    className={`text-xl font-semibold tracking-tight transition-all duration-500 md:text-3xl ${
                      hoveredService === i ? "text-on-surface translate-x-2" : "text-on-surface/70"
                    }`}
                  >
                    {svc.title}
                  </h3>
                  <motion.p
                    className="mt-2 max-w-md text-body-md text-on-surface-variant"
                    initial={{ height: 0, opacity: 0 }}
                    animate={hoveredService === i ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {svc.desc}
                  </motion.p>
                </div>
              </div>

              <motion.span
                className="text-primary opacity-0 transition-opacity group-hover:opacity-100"
                animate={hoveredService === i ? { x: 0 } : { x: -10 }}
              >
                →
              </motion.span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── STATS SECTION ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 py-section md:px-12">
        <div className="divider-gold mb-20" />
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-8">
          {[
            { value: "450K+", label: "VEHICLES MANAGED" },
            { value: "$1.2B+", label: "TOTAL FLEET VALUE" },
            { value: "98.4%", label: "OPERATIONAL UPTIME" },
            { value: "12K+", label: "MONTHLY TRANSACTIONS" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center md:text-left"
              initial={!prefersReduced ? { opacity: 0, y: 40 } : undefined}
              whileInView={!prefersReduced ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-display-sm md:text-display-lg tracking-tight text-primary">
                {stat.value}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── BRAND STATEMENT ──────────────────────────────────────────────── */}
      <section className="flex min-h-[60vh] items-center justify-center px-6 py-section">
        <motion.h2
          className="text-center font-display text-display-lg md:text-display-hero tracking-tight text-on-surface/[0.08] leading-none"
          initial={!prefersReduced ? { opacity: 0, scale: 0.95 } : undefined}
          whileInView={!prefersReduced ? { opacity: 1, scale: 1 } : undefined}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          PRECISION
          <br />
          DRIVES
          <br />
          EVERYTHING.
        </motion.h2>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 py-section md:px-12">
        <div className="divider-gold mb-20" />
        <motion.div
          className="flex flex-col items-start gap-12"
          initial={!prefersReduced ? { opacity: 0, y: 40 } : undefined}
          whileInView={!prefersReduced ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-display-sm md:text-display-xl tracking-tight text-on-surface leading-none">
            LET'S TRANSFORM
            <br />
            <span className="text-primary">YOUR FLEET.</span>
          </h2>

          <MagneticButton strength={0.2}>
            <Link
              to="/register"
              className="group flex items-center gap-4 border border-primary bg-transparent px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] text-primary transition-all hover:bg-primary hover:text-on-primary"
            >
              Enter Platform
              <motion.span
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </motion.span>
            </Link>
          </MagneticButton>

          <div className="mt-8 flex flex-wrap gap-12 text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
            <span>hello@driveflow.io</span>
            <span>San Jose, CA</span>
            <a href="#" className="transition-colors hover:text-primary">LinkedIn</a>
            <a href="#" className="transition-colors hover:text-primary">GitHub</a>
          </div>
        </motion.div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-outline-variant">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-12">
          <span className="font-display text-lg tracking-tight text-on-surface">DRIVEFLOW</span>

          <div className="flex flex-wrap gap-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
            <Link to="/login" className="transition-colors hover:text-on-surface">Dashboard</Link>
            <Link to="/login" className="transition-colors hover:text-on-surface">Inventory</Link>
            <Link to="/login" className="transition-colors hover:text-on-surface">Analytics</Link>
            <Link to="/register" className="transition-colors hover:text-on-surface">Register</Link>
          </div>

          <p className="text-[10px] tracking-[0.15em] text-on-surface-variant/50">
            © {new Date().getFullYear()} DriveFlow. All rights reserved.
          </p>
        </div>

        <div className="border-t border-outline-variant/50 py-4 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/40">
            Available for Enterprise — 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
