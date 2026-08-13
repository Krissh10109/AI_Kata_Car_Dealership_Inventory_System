import { useState, type ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { ToastContainer } from "../components/ToastContainer";
import { CustomCursor } from "../components/cinematic/CustomCursor";

interface DashboardLayoutProps {
  children: ReactNode;
  onSearch?: (value: string) => void;
  onAddVehicle?: () => void;
}

export function DashboardLayout({ children, onSearch, onAddVehicle }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Sidebar isOpen={isSidebarOpen} onCloseMobile={() => setIsSidebarOpen(false)} onAddVehicle={onAddVehicle} />
      <Topbar onSearch={onSearch} onMenuClick={() => setIsSidebarOpen(true)} />
      <main className="min-h-screen pt-14 md:pl-[240px]">
        <div className="mx-auto max-w-7xl space-y-lg p-gutter">{children}</div>
      </main>
      <footer className="md:pl-[240px] border-t border-outline-variant/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-gutter py-6 sm:flex-row">
          <p className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/40">
            <span className="text-primary/60">DriveFlow</span> © {new Date().getFullYear()} Enterprise
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/40">
            <a href="#" className="hover:text-on-surface-variant transition-colors">Privacy</a>
            <a href="#" className="hover:text-on-surface-variant transition-colors">Terms</a>
            <a href="#" className="hover:text-on-surface-variant transition-colors">Help</a>
          </div>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
}
