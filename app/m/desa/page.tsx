"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { Card, CatTile, Chip, PageHeader, Pill, Progress, Row, SectionHead } from "@/components/ui";
import { MapView } from "@/components/MapView";
import { CAT_COLOR, MONITOR, NEEDS, PROG_COLOR, PROG_LABEL } from "@/lib/data";

export default function Desa() {
  const [fac, setFac] = useState(true);
  const verified = NEEDS.filter((n) => n.status === "VERIFIED");
  return (
    <Shell nav={{ role: "m", active: 3 }}>
      <PageHeader title="Desa Sukamaju" />
      <p className="mt-1 text-xs font-medium text-ink-600">Transparansi usulan terverifikasi &amp; pembangunan berjalan</p>
      <div className="mt-4 flex gap-2">
        <Chip on={fac} onClick={() => setFac(!fac)}>Fasilitas</Chip>
        <Chip on>Usulan Terverifikasi</Chip>
      </div>
      <MapView needs={verified} facilities={fac} className="mt-3 h-56 rounded-2xl border border-ink-200" />

      <div className="mt-6 space-y-3">
        <SectionHead title="Pelaksanaan Pembangunan" />
        {MONITOR.map((m) => (
          <Card key={m.id}>
            <Row tile={<CatTile cat={m.cat} size={40} />} title={m.name} sub={`${m.area} · ${m.updated}`} right={<Pill color={PROG_COLOR[m.status]}>{PROG_LABEL[m.status]}</Pill>} />
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1"><Progress value={m.progress} color={CAT_COLOR[m.cat]} /></div>
              <span className="text-xs font-extrabold text-ink-900">{m.progress}%</span>
            </div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
