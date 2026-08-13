import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { initials } from "../utils/format";

interface TopbarProps {
  onSearch?: (value: string) => void;
  onMenuClick: () => void;
}

export function Topbar({ onSearch, onMenuClick }: TopbarProps) {
  const { user } = useAuth();
  const [query, setQuery] = useState("");

  const rawName = user?.name;
  const isVictoriaOrEmpty = !rawName || rawName === "Victoria Chen" || rawName === "Fleet Manager";
  const displayName = isVictoriaOrEmpty
    ? user?.role === "admin" || !user?.role ? "Krish Modi" : "Valued Client"
    : rawName;

  return (
    <header className="fixed inset-x-0 top-0 z-20 flex h-14 items-center gap-4 border-b border-outline-variant bg-[#0d0d0d]/90 px-4 backdrop-blur-md md:pl-[264px] md:pr-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container md:hidden"
        aria-label="Toggle navigation menu"
      >
        <span className="material-symbols-outlined text-[20px]">menu</span>
      </button>

      {onSearch && (
        <div className="relative hidden max-w-sm flex-1 sm:flex">
          <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[16px]">
            search
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder="Search inventory..."
            className="w-full bg-transparent border-0 border-b border-outline-variant/50 py-2 pl-6 pr-4 text-body-md text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      )}

      <div className="ml-auto flex items-center gap-4">
        <button
          type="button"
          className="relative rounded p-1.5 text-on-surface-variant hover:text-on-surface transition-colors"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 300" }}>notifications</span>
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-[11px] font-semibold tracking-wide text-on-surface leading-tight">
              {displayName}
            </p>
            <p className="text-[10px] uppercase tracking-[0.15em] leading-tight text-on-surface-variant">
              {user?.role === "admin" ? "Administrator" : "Client"}
            </p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 text-[10px] font-semibold text-primary bg-primary/[0.06]">
            {initials(displayName)}
          </div>
        </div>
      </div>
    </header>
  );
}
