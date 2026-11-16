"use client";

import { BookOpen, Building2, Droplet, HeartPulse, LocateFixed, MapPin, Store } from "lucide-react";
import type { ReactNode } from "react";
import { CAT_COLOR, FACILITIES, GAPS, type CatKey, type Facility, type Need, type ServiceGap } from "@/lib/data";
import { CAT_ICON } from "./icons";
import { cn } from "@/lib/utils";

/** Latar peta ilustrasi (stand-in). Pada produksi diganti Leaflet + OpenStreetMap + PostGIS. */
export function MapBackdrop() {
  const stroke = { vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, fill: "none" };
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="100" height="100" fill="#E8F3EC" />
      <ellipse cx="14" cy="16" rx="12" ry="12" fill="#CDE7D4" />
      <ellipse cx="88" cy="86" rx="11" ry="10" fill="#CDE7D4" />
      <ellipse cx="84" cy="14" rx="9" ry="9" fill="#CDE7D4" />
      <path d="M-5 58 C25 44 50 80 105 50" stroke="#BFE0F2" strokeWidth="16" {...stroke} />
      <g stroke="#fff" {...stroke}>
        <path d="M0 30 L100 22" strokeWidth="12" />
        <path d="M32 0 L40 100" strokeWidth="12" />
        <path d="M74 0 L68 100" strokeWidth="10" />
        <path d="M0 88 L100 80" strokeWidth="7" />
        <path d="M55 24 L58 100" strokeWidth="6" />
        <path d="M0 45 L32 42" strokeWidth="5" />
      </g>
      <g fill="#DCE9E1">
        <rect x="44" y="34" width="8" height="10" rx="1.5" />
        <rect x="80" y="34" width="10" height="9" rx="1.5" />
        <rect x="8" y="42" width="10" height="9" rx="1.5" />
        <rect x="20" y="64" width="8" height="9" rx="1.5" />
        <rect x="60" y="68" width="9" height="8" rx="1.5" />
      </g>
    </svg>
  );
}

const FAC_ICON = { sekolah: BookOpen, kesehatan: HeartPulse, balai: Building2, air: Droplet, pasar: Store };

function at(x: number, y: number) {
  return { left: `${x * 100}%`, top: `${y * 100}%` };
}

export function NeedPin({ need, size = 32, selected, onClick }: { need: Pick<Need, "id" | "cat" | "x" | "y">; size?: number; selected?: boolean; onClick?: () => void }) {
  const Icon = CAT_ICON[need.cat as CatKey];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={need.id}
      className={cn("absolute -translate-x-1/2 -translate-y-1/2 transition-transform", selected && "z-20 scale-125")}
      style={at(need.x, need.y)}
    >
      <span className="grid place-items-center rounded-full border-[2.5px] border-white text-white shadow-card" style={{ width: size, height: size, background: CAT_COLOR[need.cat as CatKey] }}>
        <Icon size={size * 0.5} strokeWidth={2.2} />
      </span>
    </button>
  );
}

export function FacilityMark({ f }: { f: Facility }) {
  const Icon = FAC_ICON[f.type];
  return (
    <span className="absolute grid h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg bg-white text-green-700 shadow-soft" style={at(f.x, f.y)} title={f.name}>
      <Icon size={14} strokeWidth={2.2} />
    </span>
  );
}

export function GapZone({ g }: { g: ServiceGap }) {
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-dashed border-accent-red bg-accent-red/15"
      style={{ ...at(g.x, g.y), width: `${g.r * 200}%`, aspectRatio: "1" }}
      title={g.title}
    />
  );
}

export function MapView({
  needs = [],
  facilities = false,
  gaps = false,
  selectedId,
  onSelect,
  className,
  children,
}: {
  needs?: Pick<Need, "id" | "cat" | "x" | "y">[];
  facilities?: boolean;
  gaps?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <MapBackdrop />
      {gaps && GAPS.map((g) => <GapZone key={g.id} g={g} />)}
      {facilities && FACILITIES.map((f) => <FacilityMark key={f.id} f={f} />)}
      {needs.map((n) => (
        <NeedPin key={n.id} need={n} selected={selectedId === n.id} onClick={() => onSelect?.(n.id)} />
      ))}
      {children}
    </div>
  );
}

export function CenterPin({ size = 38 }: { size?: number }) {
  return (
    <>
      <span className="absolute left-1/2 top-1/2 h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-700/20" />
      <span className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-white bg-green-700 text-white shadow-card" style={{ width: size, height: size }}>
        <MapPin size={size * 0.5} strokeWidth={2.2} />
      </span>
    </>
  );
}

export function MapFab({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <span className={cn("grid h-[34px] w-[34px] place-items-center rounded-full bg-white text-green-700 shadow-soft", className)}>
      {children ?? <LocateFixed size={18} strokeWidth={2} />}
    </span>
  );
}
