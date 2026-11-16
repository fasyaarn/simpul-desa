"use client";

import Link from "next/link";
import { BatteryFull, Building2, FileText, Home, PieChart, Plus, Signal, Target, User, BarChart3, Wifi, type LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Role = "g" | "m";

const NAVS: Record<Role, { href: string; label: string; icon: LucideIcon; fab?: boolean }[]> = {
  g: [
    { href: "/g/beranda", label: "Beranda", icon: Home },
    { href: "/g/analitik", label: "Analitik", icon: BarChart3 },
    { href: "/g/simulasi", label: "Simulasi", icon: PieChart },
    { href: "/g/prioritas", label: "Prioritas", icon: Target },
    { href: "/g/profil", label: "Profil", icon: User },
  ],
  m: [
    { href: "/m/beranda", label: "Beranda", icon: Home },
    { href: "/m/usulan", label: "Usulan", icon: FileText },
    { href: "/m/ajukan", label: "Ajukan", icon: Plus, fab: true },
    { href: "/m/desa", label: "Desa", icon: Building2 },
    { href: "/m/profil", label: "Profil", icon: User },
  ],
};

function BottomNav({ role, active }: { role: Role; active: number }) {
  return (
    <nav className="relative flex shrink-0 border-t border-ink-200 bg-white px-2.5 pb-[26px] pt-2.5">
      {NAVS[role].map((t, i) => {
        const on = i === active;
        const Icon = t.icon;
        return (
          <Link key={t.href} href={t.href} className="flex flex-1 flex-col items-center gap-1 pt-1">
            {t.fab ? (
              <span className="grid h-7 w-7 place-items-center rounded-full bg-green-700 text-white">
                <Icon size={16} strokeWidth={2.6} />
              </span>
            ) : (
              <Icon size={22} strokeWidth={on ? 2 : 1.8} className={on ? "text-green-700" : "text-ink-400"} />
            )}
            <span className={cn("text-[10.5px]", on || t.fab ? "font-bold text-green-700" : "font-medium text-ink-400")}>{t.label}</span>
          </Link>
        );
      })}
      <span className="pointer-events-none absolute bottom-2 left-1/2 hidden h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink-900 md:block" />
    </nav>
  );
}

function StatusBar() {
  return (
    <div className="hidden shrink-0 items-center justify-between px-7 pb-1 pt-[14px] text-[15px] font-bold text-ink-900 md:flex">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <Signal size={14} />
        <Wifi size={14} />
        <BatteryFull size={18} />
      </span>
    </div>
  );
}

/**
 * Cangkang halaman mobile-first. Pada layar lebar tampil sebagai "bingkai ponsel" di tengah;
 * pada ponsel tampil penuh layar.
 */
export function Shell({
  children,
  nav,
  footer,
  background,
  flush,
  className,
}: {
  children: ReactNode;
  nav?: { role: Role; active: number };
  footer?: ReactNode;
  background?: string;
  flush?: boolean;
  className?: string;
}) {
  const style: CSSProperties | undefined = background ? { background } : undefined;
  return (
    <div className="flex min-h-[100dvh] items-center justify-center md:py-6">
      <div className="relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-white md:h-[844px] md:rounded-[36px] md:shadow-phone" style={style}>
        <StatusBar />
        <main className={cn("flex-1 overflow-y-auto", flush ? "" : "px-5 pb-6 pt-2", className)}>{children}</main>
        {footer && <div className="shrink-0 bg-white px-5 pb-8 pt-3">{footer}</div>}
        {nav && <BottomNav role={nav.role} active={nav.active} />}
      </div>
    </div>
  );
}
