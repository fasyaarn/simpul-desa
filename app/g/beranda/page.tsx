"use client";

import Link from "next/link";
import { Activity, Bell, ClipboardCheck, FileClock, FileText, Handshake, Map as MapIcon, ScrollText } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Avatar, Card, CatTile, HeroCard, Pill, Row, SectionHead, StatusPill } from "@/components/ui";
import { DANA_DESA_TOTAL, NEEDS } from "@/lib/data";
import { DEFAULT_WEIGHTS, rankPrograms, rp } from "@/lib/logic";
import { useLocal } from "@/lib/store";

export default function BerandaPemerintah() {
  const [w] = useLocal<number[]>("simpul.weights", DEFAULT_WEIGHTS);
  const top = rankPrograms(w).slice(0, 3);
  const queue = NEEDS.filter((n) => n.status === "SUBMITTED" || n.status === "UNDER_REVIEW");
  const stats = [
    { label: "Masuk", value: NEEDS.filter((n) => n.status === "SUBMITTED").length, color: "#4C7DF0" },
    { label: "Ditinjau", value: NEEDS.filter((n) => n.status === "UNDER_REVIEW").length, color: "#F59E42" },
    { label: "Terverifikasi", value: NEEDS.filter((n) => n.status === "VERIFIED").length, color: "#1B8A5F" },
  ];
  const quick = [
    { icon: ClipboardCheck, label: "Verifikasi", href: "/g/usulan" },
    { icon: MapIcon, label: "Peta", href: "/g/peta" },
    { icon: Handshake, label: "Lintas Desa", href: "/g/koordinasi" },
    { icon: Activity, label: "Monitoring", href: "/g/monitoring" },
  ];
  return (
    <Shell nav={{ role: "g", active: 0 }}>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar initials="PA" />
          <div>
            <p className="text-xs font-medium text-ink-600">Admin Desa Sukamaju</p>
            <p className="text-base font-extrabold text-ink-900">Pak Anwar</p>
          </div>
        </div>
        <span className="relative grid h-10 w-10 place-items-center rounded-full border border-ink-200 bg-white"><Bell size={19} /><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent-red" /></span>
      </header>

      <HeroCard className="mt-5">
        <p className="text-xs font-semibold text-green-100">Dana Desa tersedia (simulasi 2027)</p>
        <p className="mt-1 text-[30px] font-extrabold leading-none">{rp(DANA_DESA_TOTAL)}</p>
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/15 px-3 py-2.5">
              <p className="text-[10.5px] font-medium text-green-100">{s.label}</p>
              <p className="text-lg font-extrabold">{s.value}</p>
            </div>
          ))}
        </div>
      </HeroCard>

      <div className="mt-5 grid grid-cols-4 gap-2.5">
        {quick.map((q) => (
          <Link key={q.label} href={q.href} className="flex flex-col items-center gap-2 rounded-2xl border border-green-100 bg-green-50 py-3.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-green-700 shadow-soft"><q.icon size={19} /></span>
            <span className="text-[11px] font-bold text-green-800">{q.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <SectionHead title="Antrean Verifikasi" href="/g/usulan" />
        <Card className="space-y-4">
          {queue.slice(0, 3).map((n) => (
            <Row key={n.id} href={`/g/usulan/${n.id}`} tile={<CatTile cat={n.cat} />} title={n.title} sub={`${n.id} · ${n.whenShort}`} right={<StatusPill status={n.status} />} />
          ))}
        </Card>
      </div>

      <div className="mt-6 space-y-3">
        <SectionHead title="Rekomendasi Prioritas" href="/g/prioritas" />
        <Card className="space-y-4">
          {top.map((p, i) => (
            <Row key={p.id} tile={<span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-green-50 text-base font-extrabold text-green-700">{i + 1}</span>} title={p.name} sub={`${rp(p.cost)} · ${p.beneficiaries} jiwa`} right={<Pill color="#1B8A5F">Skor {p.score}</Pill>} />
          ))}
        </Card>
        <p className="flex items-center gap-1.5 px-1 text-[11px] font-medium text-ink-600"><ScrollText size={13} /> Skor bersifat rekomendasi; keputusan akhir tetap di tangan pemerintah desa.</p>
      </div>
    </Shell>
  );
}
