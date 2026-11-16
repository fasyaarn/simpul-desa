import {
  BookOpen,
  Droplet,
  HeartPulse,
  Layers,
  Route,
  Store,
  Tractor,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { CatKey } from "@/lib/data";

export const CAT_ICON: Record<CatKey, LucideIcon> = {
  infrastruktur: Route,
  air: Droplet,
  pendidikan: BookOpen,
  kesehatan: HeartPulse,
  ekonomi: Store,
  pertanian: Tractor,
  lainnya: Layers,
};

/** Ikon "simpul" (logo): tiga titik yang saling terhubung. */
export function NodeIcon({ size = 22, className, strokeWidth = 2 }: { size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="6" cy="7" r="2.6" />
      <circle cx="18" cy="7" r="2.6" />
      <circle cx="12" cy="18" r="2.6" />
      <path d="M8 8.3l3 7.4M16 8.3l-3 7.4M8.6 7h6.8" />
    </svg>
  );
}
