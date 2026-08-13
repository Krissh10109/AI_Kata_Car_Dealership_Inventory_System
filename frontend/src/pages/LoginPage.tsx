import { useState, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import { CustomCursor } from "../components/cinematic/CustomCursor";

type PersonaRole = "fleet_manager" | "admin" | "sales_exec";

export function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  const [activePersona, setActivePersona] = useState<PersonaRole>("admin");
  const [email, setEmail] = useState("admin@globalmotors.com");
  const [password, setPassword] = useState("demo1234");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Forgot Password modal state
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [forgotSuccessMessage, setForgotSuccessMessage] = useState("");

  const registrationState = location.state as { registered?: boolean; email?: string } | null;
  const from = (location.state as { from?: string })?.from ?? "/dashboard";

  function handlePersonaSwitch(role: PersonaRole) {
    setActivePersona(role);
    if (role === "admin") {
      setEmail("admin@globalmotors.com");
      setPassword("demo1234");
    } else if (role === "fleet_manager") {
      setEmail("manager@globalmotors.com");
      setPassword("demo1234");
    } else {
      setEmail("user@globalmotors.com");
      setPassword("demo1234");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch {
      // Error is rendered from AuthContext
    }
  }

  async function handleSendResetLink(e: FormEvent) {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setIsForgotLoading(true);
    setForgotSuccessMessage("");
    try {
      const res = await authService.forgotPassword(forgotEmail);
      setForgotSuccessMessage(res.message);
    } catch {
      setForgotSuccessMessage("If an account exists with that email address, a password reset link has been dispatched.");
    } finally {
      setIsForgotLoading(false);
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-on-surface antialiased selection:bg-primary/20 selection:text-on-surface">
      <CustomCursor />

      {/* ─── LEFT: Form Section ───────────────────────────────────────────── */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-12 min-h-screen z-10 relative bg-[#0e0e0e]">
        {/* Top Logo */}
        <Link to="/" className="font-display text-lg tracking-tight text-on-surface transition-opacity hover:opacity-70">
          DRIVEFLOW
        </Link>

        {/* Main Form Area */}
        <div className="max-w-sm w-full mx-auto my-auto py-12">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={!prefersReduced ? fadeUp : undefined}
            initial={!prefersReduced ? "hidden" : undefined}
            animate={!prefersReduced ? "visible" : undefined}
            className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary"
          >
            <span className="h-px w-4 bg-primary" />
            Secure Access
          </motion.div>

          <motion.h1
            custom={1}
            variants={!prefersReduced ? fadeUp : undefined}
            initial={!prefersReduced ? "hidden" : undefined}
            animate={!prefersReduced ? "visible" : undefined}
            className="font-display text-3xl tracking-tight text-on-surface mb-2 md:text-4xl"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            custom={2}
            variants={!prefersReduced ? fadeUp : undefined}
            initial={!prefersReduced ? "hidden" : undefined}
            animate={!prefersReduced ? "visible" : undefined}
            className="text-body-md text-on-surface-variant mb-10"
          >
            Access your enterprise dealership platform.
          </motion.p>

          {/* Role Persona Selector */}
          <motion.div
            custom={3}
            variants={!prefersReduced ? fadeUp : undefined}
            initial={!prefersReduced ? "hidden" : undefined}
            animate={!prefersReduced ? "visible" : undefined}
            className="mb-8"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant mb-3">
              Demo Role
            </p>
            <div className="flex border border-outline-variant rounded-none overflow-hidden">
              {(["admin", "fleet_manager", "sales_exec"] as PersonaRole[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handlePersonaSwitch(role)}
                  className={`flex-1 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-all border-r border-outline-variant last:border-r-0 ${
                    activePersona === role
                      ? "bg-primary/10 text-primary border-primary"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {role === "admin" ? "Admin" : role === "fleet_manager" ? "Manager" : "Sales"}
                </button>
              ))}
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <AnimatePresence mode="wait">
              {registrationState?.registered && (
                <motion.p
                  key="registered-banner"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border border-success/30 bg-success/5 px-4 py-3 text-body-md text-success"
                >
                  Account created for {registrationState.email ?? "your email"}. Sign in below.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <motion.div
              custom={4}
              variants={!prefersReduced ? fadeUp : undefined}
              initial={!prefersReduced ? "hidden" : undefined}
              animate={!prefersReduced ? "visible" : undefined}
            >
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="block w-full bg-transparent border-0 border-b border-outline-variant px-0 py-3 text-body-lg text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors"
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              custom={5}
              variants={!prefersReduced ? fadeUp : undefined}
              initial={!prefersReduced ? "hidden" : undefined}
              animate={!prefersReduced ? "visible" : undefined}
              className="relative"
            >
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full bg-transparent border-0 border-b border-outline-variant px-0 py-3 pr-10 text-body-lg text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-0 bottom-3 text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              custom={6}
              variants={!prefersReduced ? fadeUp : undefined}
              initial={!prefersReduced ? "hidden" : undefined}
              animate={!prefersReduced ? "visible" : undefined}
              className="flex items-center justify-between pt-2"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded-sm border-outline-variant bg-transparent text-primary focus:ring-primary/30"
                />
                <span className="text-[11px] text-on-surface-variant">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setIsForgotOpen(true);
                }}
                className="text-[11px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
              >
                Forgot Password?
              </button>
            </motion.div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  key="login-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 border border-error/30 bg-error/5 px-4 py-3 text-body-md text-error"
                >
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div
              custom={7}
              variants={!prefersReduced ? fadeUp : undefined}
              initial={!prefersReduced ? "hidden" : undefined}
              animate={!prefersReduced ? "visible" : undefined}
            >
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-primary text-on-primary text-[13px] font-semibold uppercase tracking-[0.1em] transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                <span>{isLoading ? "Authenticating..." : "Enter Platform"}</span>
                <span>→</span>
              </button>
            </motion.div>
          </form>

          <p className="mt-8 text-center text-[11px] text-on-surface-variant">
            New to the platform?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/40 pt-6 border-t border-outline-variant/30">
          <a href="#" className="hover:text-on-surface-variant transition-colors">Privacy</a>
          <a href="#" className="hover:text-on-surface-variant transition-colors">Terms</a>
          <a href="#" className="hover:text-on-surface-variant transition-colors">Security</a>
        </div>
      </div>

      {/* ─── RIGHT: Cinematic Visual Panel ────────────────────────────────── */}
      <div className="hidden md:flex w-1/2 bg-[#0a0a0a] relative overflow-hidden flex-col justify-between p-12">
        {/* Atmospheric glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-[150px]" />
        </div>

        {/* Top status */}
        <div className="flex justify-end relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            System Operational
          </div>
        </div>

        {/* Center editorial statement */}
        <div className="relative z-10 flex-1 flex items-center">
          <div>
            <h2 className="font-display text-5xl lg:text-6xl tracking-tight text-on-surface/[0.07] leading-none mb-8">
              PRECISION
              <br />
              DRIVES
              <br />
              EVERYTHING.
            </h2>

            <div className="space-y-6 max-w-xs">
              <div className="border-t border-outline-variant pt-6">
                <p className="text-display-sm font-bold tracking-tight text-primary">$1.2B+</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant mt-1">Fleet Value Managed</p>
              </div>
              <div className="border-t border-outline-variant pt-6">
                <p className="text-display-sm font-bold tracking-tight text-on-surface">450K+</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant mt-1">Active Vehicles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom security badges */}
        <div className="relative z-10 flex gap-8 text-[10px] font-semibold uppercase tracking-[0.15em] text-on-surface-variant/40">
          <span>SOC 2 Type II</span>
          <span>256-bit Encrypted</span>
          <span>GDPR Ready</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotOpen}
        onClose={() => {
          setIsForgotOpen(false);
          setForgotSuccessMessage("");
        }}
        title="Reset Account Password"
      >
        {forgotSuccessMessage ? (
          <div className="space-y-md text-center py-md">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success mx-auto">
              <span className="material-symbols-outlined text-[28px]">mark_email_read</span>
            </span>
            <p className="text-body-md text-on-surface">{forgotSuccessMessage}</p>
            <Button
              variant="secondary"
              onClick={() => {
                setIsForgotOpen(false);
                setForgotSuccessMessage("");
              }}
              className="w-full justify-center"
            >
              Return to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSendResetLink} className="space-y-md">
            <p className="text-body-md text-on-surface-variant">
              Enter your registered work email address below and we will dispatch a secure password reset link.
            </p>
            <input
              type="email"
              required
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
            <div className="flex gap-sm pt-sm">
              <Button type="button" variant="secondary" onClick={() => setIsForgotOpen(false)} className="flex-1 justify-center">
                Cancel
              </Button>
              <Button type="submit" isLoading={isForgotLoading} className="flex-1 justify-center">
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
