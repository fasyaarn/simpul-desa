"use client";

import Link from "next/link";
import { Bell, FileText, Map as MapIcon, Plus } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Avatar, CatTile, HeroCard, Progress, Row, SectionHead, StatusPill, Card } from "@/components/ui";
import { MONITOR, MY_NEEDS, PROG_COLOR, PROG_LABEL, CAT_COLOR } from "@/lib/data";
import { useLocal } from "@/lib/store";
import type { Need } from "@/lib/data";

export default function BerandaMasyarakat() {
  const [extra] = useLocal<Need[]>("simpul.submitted", []);
  const all = [...extra, ...MY_NEEDS];
  const verified = all.filter((n) => n.status === "VERIFIED").length;
  const process = all.filter((n) => n.status === "SUBMITTED" || n.status === "UNDER_REVIEW").length;
  const quick = [
    { icon: Plus, label: "Ajukan", href: "/m/ajukan" },
    { icon: FileText, label: "Usulan Saya", href: "/m/usulan" },
    { icon: MapIcon, label: "Peta Desa", href: "/m/desa" },
  ];
  return (
    <Shell nav={{ role: "m", active: 0 }}>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar initials="BS" />
          <div>
            <p className="text-xs font-medium text-ink-600">Selamat datang,</p>
            <p className="text-base font-extrabold text-ink-900">Budi Santoso</p>
          </div>
        </div>
        <span className="relative grid h-10 w-10 place-items-center rounded-full border border-ink-200 bg-white text-ink-900">
          <Bell size={19} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent-red" />
        </span>
      </header>

      <HeroCard className="mt-5">
        <p className="text-xs font-semibold text-green-100">Usulan saya</p>
        <p className="mt-1 text-[34px] font-extrabold leading-none">{all.length}</p>
        <div className="mt-5 flex gap-3">
          <div className="flex-1 rounded-2xl bg-white/15 px-3.5 py-2.5">
            <p className="text-[11px] font-medium text-green-100">Dalam proses</p>
            <p className="text-lg font-extrabold">{process}</p>
          </div>
          <div className="flex-1 rounded-2xl bg-white/15 px-3.5 py-2.5">
            <p className="text-[11px] font-medium text-green-100">Terverifikasi</p>
            <p className="text-lg font-extrabold">{verified}</p>
          </div>
        </div>
      </HeroCard>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {quick.map((q) => (
          <Link key={q.label} href={q.href} className="flex flex-col items-center gap-2 rounded-2xl border border-green-100 bg-green-50 py-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-green-700 shadow-soft">
              <q.icon size={19} strokeWidth={2} />
            </span>
            <span className="text-xs font-bold text-green-800">{q.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <SectionHead title="Status Usulan Terbaru" href="/m/usulan" />
        <Card className="space-y-4">
          {all.slice(0, 3).map((n) => (
            <Row key={n.id} href={`/m/usulan/${n.id}`} tile={<CatTile cat={n.cat} />} title={n.title} sub={`${n.id} · ${n.whenShort}`} right={<StatusPill status={n.status} />} />
          ))}
        </Card>
      </div>

      <div className="mt-6 space-y-3">
        <SectionHead title="Pembangunan di Desa" href="/m/desa" label="Selengkapnya" />
        {MONITOR.filter((m) => m.status === "IN_PROGRESS").map((m) => (
          <Card key={m.id}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-ink-900">{m.name}</p>
              <span className="text-xs font-extrabold" style={{ color: PROG_COLOR[m.status] }}>{m.progress}%</span>
            </div>
            <div className="mt-2.5"><Progress value={m.progress} color={CAT_COLOR[m.cat]} /></div>
            <p className="mt-2 text-[11.5px] font-medium text-ink-600">{PROG_LABEL[m.status]} · diperbarui {m.updated}</p>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
