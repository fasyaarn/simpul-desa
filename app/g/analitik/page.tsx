"use client";

import { Shell } from "@/components/Shell";
import { Card, CatTile, PageHeader, Progress, SectionHead } from "@/components/ui";
import { BarChart } from "@/components/charts";
import { CAT_COLOR, MONTHLY, NEEDS, TOP_CATS } from "@/lib/data";

export default function Analitik() {
  const total = TOP_CATS.reduce((a, c) => a + c.count, 0);
  const kpi = [
    { label: "Total usulan", value: String(total) },
    { label: "Bulan ini", value: String(MONTHLY[MONTHLY.length - 1].v) },
    { label: "Terverifikasi", value: `${NEEDS.filter((n) => n.status === "VERIFIED").length}/${NEEDS.length}` },
  ];
  return (
    <Shell nav={{ role: "g", active: 1 }}>
      <PageHeader title="Analitik" />
      <div className="mt-4 grid grid-cols-3 gap-3">
        {kpi.map((k) => (
          <Card key={k.label} tone="mint" className="!p-3">
            <p className="text-[11px] font-medium text-ink-600">{k.label}</p>
            <p className="mt-1 text-xl font-extrabold text-green-800">{k.value}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-5">
        <SectionHead title="Usulan per Bulan" />
        <div className="mt-3"><BarChart data={MONTHLY} max={50} /></div>
      </Card>
      <div className="mt-6 space-y-3">
        <SectionHead title="Kategori Terbanyak" />
        <Card className="space-y-4">
          {TOP_CATS.map((c) => (
            <div key={c.cat} className="flex items-center gap-3">
              <CatTile cat={c.cat} size={38} />
              <div className="flex-1">
                <div className="mb-1.5 flex justify-between text-[12.5px]"><span className="font-bold text-ink-900">{c.label}</span><span className="font-semibold text-ink-600">{c.count} · {c.pct}%</span></div>
                <Progress value={c.pct * 2.5} color={CAT_COLOR[c.cat]} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </Shell>
  );
}
