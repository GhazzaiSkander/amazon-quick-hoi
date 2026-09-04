import type { ReactNode } from "react";
import MockDataBadge from "@/components/ui/MockDataBadge";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-hoi-cream">
      <Sidebar />

      <main className="relative min-w-0 flex-1">
        <div className="pointer-events-none absolute end-6 top-4 z-10 lg:end-12">
          <MockDataBadge />
        </div>

        {children}
      </main>
    </div>
  );
}