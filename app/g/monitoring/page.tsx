"use client";

import { AlertTriangle } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Card, CatTile, PageHeader, Pill, Progress, Row } from "@/components/ui";
import { AreaChart } from "@/components/charts";
import { CAT_COLOR, MONITOR, PROG_COLOR, PROG_LABEL } from "@/lib/data";
import { rp } from "@/lib/logic";

export default function Monitoring() {
  const avg = Math.round(MONITOR.reduce((a, m) => a + m.progress, 0) / MONITOR.length);
  return (
    <Shell nav={{ role: "g", active: 0 }}>
      <PageHeader title="Monitoring Pelaksanaan" back="/g/beranda" />
      <Card tone="mint" className="mt-4">
        <div className="flex justify-between"><p className="text-xs font-medium text-ink-600">Rata-rata progres</p><p className="text-xl font-extrabold text-green-800">{avg}%</p></div>
        <div className="mt-3"><AreaChart values={[8, 15, 24, 33, 41, avg]} labels={["Jun", "Jul", "Agu", "Sep", "Okt", "Nov"]} /></div>
      </Card>
      <div className="mt-5 space-y-3">
        {MONITOR.map((m) => (
          <Card key={m.id}>
            <Row tile={<CatTile cat={m.cat} size={40} />} title={m.name} sub={`${m.area} · ${rp(m.budget)}`} right={<Pill color={PROG_COLOR[m.status]}>{PROG_LABEL[m.status]}</Pill>} />
            <div className="mt-3 flex items-center gap-3"><div className="flex-1"><Progress value={m.progress} color={CAT_COLOR[m.cat]} /></div><span className="text-xs font-extrabold">{m.progress}%</span></div>
            <p className="mt-2.5 text-[12px] font-medium leading-[17px] text-ink-600">{m.lastNote}</p>
            {m.issue && <p className="mt-2 flex items-start gap-1.5 rounded-xl bg-accent-orange/10 p-2.5 text-[11.5px] font-semibold text-ink-900"><AlertTriangle size={14} className="mt-px shrink-0 text-accent-orange" />{m.issue}</p>}
            <p className="mt-2 text-[10.5px] font-medium text-ink-400">Diperbarui {m.updated}</p>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
