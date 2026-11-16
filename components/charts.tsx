"use client";

import { useId } from "react";

/* ---------- Grafik batang (Analitik) ---------- */
export function BarChart({ data, max = 50 }: { data: { m: string; v: number }[]; max?: number }) {
  const W = 350, H = 172, x0 = 34, baseY = 146, plotW = 316;
  const k = 135 / max;
  const slot = plotW / data.length;
  const last = data.length - 1;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Grafik usulan per bulan">
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = baseY - 27 * i;
        return (
          <g key={i}>
            <line x1={x0} x2={x0 + plotW} y1={y} y2={y} stroke="#E4EAE7" />
            <text x={0} y={y + 3.5} fontSize="10" fill="#97A59F" fontWeight="500">{(max / 5) * i}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const h = d.v * k, bw = 28, bx = x0 + slot * i + (slot - bw) / 2;
        const isLast = i === last;
        return (
          <g key={d.m}>
            <path d={`M${bx} ${baseY} V${baseY - h + 9} a9 9 0 0 1 9 -9 h10 a9 9 0 0 1 9 9 V${baseY} Z`} fill={isLast ? "#0F5B3F" : "#2FA874"} opacity={isLast ? 1 : 0.92} />
            <text x={bx + bw / 2} y={baseY + 19} fontSize="11" fill="#97A59F" textAnchor="middle" fontWeight="500">{d.m}</text>
            {isLast && (
              <g>
                <rect x={bx + bw / 2 - 17} y={baseY - h - 28} width="34" height="22" rx="8" fill="#0F5B3F" />
                <text x={bx + bw / 2} y={baseY - h - 13} fontSize="11.5" fill="#fff" textAnchor="middle" fontWeight="700">{d.v}</text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Grafik garis berarea (Monitoring) ---------- */
export function AreaChart({ values, labels }: { values: number[]; labels: string[] }) {
  const id = useId().replace(/:/g, "");
  const W = 314, H = 120;
  const min = Math.min(...values) - 8, max = Math.max(...values) + 4;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * (W - 16), 100 - ((v - min) / (max - min)) * 90] as const);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
  }
  const last = pts[pts.length - 1];
  return (
    <div>
      <svg viewBox={`-4 -8 ${W} ${H}`} className="w-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2FA874" stopOpacity=".32" />
            <stop offset="1" stopColor="#2FA874" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${d} L${last[0]} 110 L0 110 Z`} fill={`url(#${id})`} />
        <path d={d} fill="none" stroke="#1B8A5F" strokeWidth="3" strokeLinecap="round" />
        <circle cx={last[0]} cy={last[1]} r="6" fill="#fff" stroke="#1B8A5F" strokeWidth="3" />
      </svg>
      <div className="mt-1 flex justify-between text-[10.5px] font-medium text-ink-400">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Donut komposisi (Simulator) ---------- */
export function Donut({ segments, center, sub }: { segments: { label: string; value: number; color: string }[]; center: string; sub: string }) {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  const R = 62, C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div className="relative h-[150px] w-[150px] shrink-0">
      <svg viewBox="0 0 150 150" className="-rotate-90">
        <circle cx="75" cy="75" r={R} fill="none" stroke="#E4EAE7" strokeWidth="22" />
        {segments.map((s) => {
          const len = (s.value / total) * C;
          const el = (
            <circle key={s.label} cx="75" cy="75" r={R} fill="none" stroke={s.color} strokeWidth="22" strokeDasharray={`${Math.max(0, len - 2)} ${C - Math.max(0, len - 2)}`} strokeDashoffset={-acc} />
          );
          acc += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <p className="text-[14.5px] font-extrabold leading-tight text-ink-900">{center}</p>
        <p className="text-[11px] font-medium text-ink-600">{sub}</p>
      </div>
    </div>
  );
}

/* ---------- Cincin persentase (Profil) ---------- */
export function Ring({ pct, size = 72, light }: { pct: number; size?: number; light?: boolean }) {
  const r = size / 2 - 6, C = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={light ? "#ffffff40" : "#E4EAE7"} strokeWidth="7" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={light ? "#fff" : "#14704E"} strokeWidth="7" strokeLinecap="round" strokeDasharray={`${(pct / 100) * C} ${C}`} />
      </svg>
      <span className={`absolute inset-0 grid place-items-center text-base font-extrabold ${light ? "text-white" : "text-ink-900"}`}>{pct}%</span>
    </div>
  );
}

/* ---------- Slider (Bobot kriteria) ---------- */
export function Slider({ value, onChange, min = 0, max = 50, color = "#14704E", label }: { value: number; onChange: (v: number) => void; min?: number; max?: number; color?: string; label: string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative h-6">
      <div className="absolute inset-x-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-ink-200" />
      <div className="absolute left-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full" style={{ width: `${pct}%`, background: color }} />
      <div className="absolute top-1/2 h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] bg-white shadow-soft" style={{ left: `${pct}%`, borderColor: color }} />
      <input aria-label={label} type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
    </div>
  );
}
