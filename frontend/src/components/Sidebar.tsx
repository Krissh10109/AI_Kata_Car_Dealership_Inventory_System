import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useAuth } from "../hooks/useAuth";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/inventory", label: "Inventory", icon: "directions_car" },
  { to: "/analytics", label: "Analytics", icon: "bar_chart" },
  { to: "/pipeline", label: "Pipeline", icon: "view_kanban" },
  { to: "/settings", label: "Settings", icon: "settings" },
];

interface SidebarProps {
  onAddVehicle?: () => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ onAddVehicle, isOpen, onCloseMobile }: SidebarProps) {
  const { logout } = useAuth();
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onCloseMobile}
            aria-hidden="true"
            initial={!prefersReduced ? { opacity: 0 } : undefined}
            animate={!prefersReduced ? { opacity: 1 } : undefined}
            exit={!prefersReduced ? { opacity: 0 } : undefined}
          />
        )}
      </AnimatePresence>
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[240px] flex-col border-r border-outline-variant bg-[#0d0d0d] transition-transform duration-200 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center px-6 py-8 border-b border-outline-variant/50">
          <span className="font-display text-lg tracking-tight text-on-surface">DRIVEFLOW</span>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-1 flex-col gap-1 px-3 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={`group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-primary/[0.06]"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                {/* Active indicator — thin gold left border */}
                {isActive && (
                  <motion.div
                    layoutId={!prefersReduced ? "sidebar-active" : undefined}
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 300" }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="mt-auto flex flex-col gap-1 px-3 pb-4">
          {onAddVehicle && (
            <motion.button
              type="button"
              onClick={onAddVehicle}
              className="flex w-full items-center justify-center gap-2 border border-primary px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary transition-all hover:bg-primary hover:text-on-primary"
              whileTap={!prefersReduced ? { scale: 0.97 } : undefined}
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Add Vehicle
            </motion.button>
          )}

          <div className="mt-2 flex flex-col gap-0.5 border-t border-outline-variant/50 pt-3">
            <NavLink
              to="/support"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-primary/[0.06]"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`
              }
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 300" }}>support_agent</span>
              Support
            </NavLink>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant transition-all hover:text-error hover:bg-error/5"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 300" }}>logout</span>
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
