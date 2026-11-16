"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { CAT_COLOR, STATUS_COLOR, STATUS_LABEL, type CatKey, type NeedStatus } from "@/lib/data";
import { CAT_ICON } from "./icons";
import { alpha, cn } from "@/lib/utils";

export function PageHeader({ title, back, right }: { title: string; back?: string | true; right?: ReactNode }) {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between py-1">
      <div className="flex items-center gap-3">
        {back &&
          (typeof back === "string" ? (
            <Link href={back} aria-label="Kembali" className="-ml-1 text-ink-900">
              <ChevronLeft size={26} strokeWidth={2.2} />
            </Link>
          ) : (
            <button onClick={() => router.back()} aria-label="Kembali" className="-ml-1 text-ink-900">
              <ChevronLeft size={26} strokeWidth={2.2} />
            </button>
          ))}
        <h1 className="text-[19px] font-extrabold tracking-tight text-ink-900">{title}</h1>
      </div>
      {right && <div className="flex items-center gap-4 text-ink-900">{right}</div>}
    </header>
  );
}

export function SectionHead({ title, href, label = "Lihat Semua" }: { title: string; href?: string; label?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base font-bold text-ink-900">{title}</h2>
      {href && (
        <Link href={href} className="flex items-center gap-0.5 text-xs font-semibold text-green-700">
          {label}
          <ChevronRight size={14} strokeWidth={2.4} />
        </Link>
      )}
    </div>
  );
}

export function HeroCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[22px] bg-gradient-to-br from-green-700 to-green-900 p-5 text-white shadow-card", className)}>
      {children}
    </div>
  );
}

export function Card({ children, className, tone = "white" }: { children: ReactNode; className?: string; tone?: "white" | "mint" }) {
  return (
    <div className={cn("rounded-2xl border p-3.5", tone === "mint" ? "border-green-100 bg-green-50" : "border-ink-200 bg-white", className)}>
      {children}
    </div>
  );
}

export function Pill({ color, children, className }: { color: string; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-[10px] px-[9px] py-1 text-[11px] font-bold", className)} style={{ background: alpha(color, 0.14), color }}>
      {children}
    </span>
  );
}

export const StatusPill = ({ status }: { status: NeedStatus }) => <Pill color={STATUS_COLOR[status]}>{STATUS_LABEL[status]}</Pill>;

export function Tile({ icon: Icon, color, size = 44 }: { icon: LucideIcon; color: string; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center" style={{ width: size, height: size, borderRadius: size * 0.32, background: alpha(color, 0.14), color }}>
      <Icon size={Math.round(size * 0.5)} strokeWidth={1.9} />
    </span>
  );
}

export function CatTile({ cat, size = 44 }: { cat: CatKey; size?: number }) {
  return <Tile icon={CAT_ICON[cat]} color={CAT_COLOR[cat]} size={size} />;
}

export function Chip({ on, children, onClick }: { on?: boolean; children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-full px-[15px] py-2 text-[12.5px] transition-colors",
        on ? "bg-green-800 font-bold text-white" : "border border-green-100 bg-green-50 font-semibold text-ink-600",
      )}
    >
      {children}
    </button>
  );
}

export function Seg({ items, active, onChange }: { items: string[]; active: number; onChange?: (i: number) => void }) {
  return (
    <div className="flex gap-1 rounded-2xl border border-green-100 bg-green-50 p-1">
      {items.map((l, i) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange?.(i)}
          className={cn("flex-1 rounded-xl py-[9px] text-[13px] transition-colors", i === active ? "bg-green-800 font-bold text-white" : "font-semibold text-ink-600")}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Row({
  tile,
  title,
  sub,
  right,
  href,
}: {
  tile: ReactNode;
  title: string;
  sub?: ReactNode;
  right?: ReactNode;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-3">
      {tile}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-ink-900">{title}</p>
        {sub && <p className="mt-0.5 truncate text-[11.5px] font-medium text-ink-600">{sub}</p>}
      </div>
      {right}
    </div>
  );
  return href ? (
    <Link href={href} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function Progress({ value, color = "#1B8A5F", h = 6, track = "#E4EAE7" }: { value: number; color?: string; h?: number; track?: string }) {
  return (
    <div className="w-full overflow-hidden rounded-full" style={{ height: h, background: track }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }} />
    </div>
  );
}

export function Avatar({ initials, size = 44 }: { initials: string; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-green-500 to-green-800 font-extrabold text-white" style={{ width: size, height: size, fontSize: size * 0.32 }}>
      {initials}
    </span>
  );
}

type BtnProps = {
  variant?: "primary" | "soft" | "outline" | "danger";
  href?: string;
  icon?: LucideIcon;
  iconFirst?: boolean;
  full?: boolean;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({ variant = "primary", href, icon: Icon, iconFirst, full = true, children, ...rest }: BtnProps) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-[15px] font-bold transition active:scale-[0.99] disabled:opacity-50",
    full && "w-full",
    variant === "primary" && "bg-green-700 text-white shadow-card",
    variant === "soft" && "border border-green-100 bg-green-50 text-green-700",
    variant === "outline" && "border-[1.5px] border-green-700 bg-white text-green-700",
    variant === "danger" && "border-[1.5px] border-accent-red bg-white text-accent-red",
  );
  const content = (
    <>
      {Icon && iconFirst && <Icon size={18} strokeWidth={2.2} />}
      {children}
      {Icon && !iconFirst && <Icon size={18} strokeWidth={2.2} />}
    </>
  );
  if (href)
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  );
}

const inputBase = "w-full rounded-[14px] border border-ink-200 bg-white px-3.5 py-[13px] text-[13.5px] font-medium text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-green-600 focus:ring-2 focus:ring-green-100";

export function Field({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  multiline,
  rows = 3,
  readOnly,
  type = "text",
}: {
  label: string;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  multiline?: boolean;
  rows?: number;
  readOnly?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink-600">{label}</span>
      <span className="relative block">
        {multiline ? (
          <textarea className={cn(inputBase, "resize-none leading-5")} rows={rows} value={value} placeholder={placeholder} readOnly={readOnly} onChange={(e) => onChange?.(e.target.value)} />
        ) : (
          <input className={cn(inputBase, Icon && "pr-10")} type={type} value={value} placeholder={placeholder} readOnly={readOnly} onChange={(e) => onChange?.(e.target.value)} />
        )}
        {Icon && !multiline && <Icon size={18} strokeWidth={1.9} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400" />}
      </span>
    </label>
  );
}

export function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-start gap-2.5 text-left">
      <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-[1.5px]", checked ? "border-green-700 bg-green-700 text-white" : "border-ink-200 bg-white")}>
        {checked && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        )}
      </span>
      <span className="text-[11.5px] font-medium leading-[17px] text-ink-600">{children}</span>
    </button>
  );
}

export function Stepper({ step, title }: { step: number; title: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-green-700">Langkah {step} dari 2</span>
        <span className="font-medium text-ink-600">{title}</span>
      </div>
      <div className="flex gap-1.5">
        {[1, 2].map((i) => (
          <span key={i} className={cn("h-[5px] flex-1 rounded-full", i <= step ? "bg-green-700" : "bg-ink-200")} />
        ))}
      </div>
    </div>
  );
}

export function Toast({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <div className={cn("pointer-events-none absolute inset-x-5 bottom-24 z-50 rounded-2xl bg-ink-900 px-4 py-3 text-center text-[13px] font-semibold text-white shadow-phone transition-all", show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}>
      {children}
    </div>
  );
}
