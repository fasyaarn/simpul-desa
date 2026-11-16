"use client";

import { useState } from "react";
import Link from "next/link";
import { Shell } from "@/components/Shell";
import { Card, CatTile, Chip, PageHeader, Pill, Row } from "@/components/ui";
import { MapView } from "@/components/MapView";
import { CAT_LABEL, GAPS, NEEDS, STATUS_COLOR, STATUS_LABEL } from "@/lib/data";
import { CAT_COLOR } from "@/lib/data";

export default function PetaAnalisis() {
  const [fac, setFac] = useState(true);
  const [gap, setGap] = useState(true);
  const [sel, setSel] = useState<string>("USL-0147");
  const n = NEEDS.find((x) => x.id === sel);
  return (
    <Shell nav={{ role: "g", active: 0 }}>
      <PageHeader title="Peta & Analisis Spasial" back="/g/beranda" />
      <div className="mt-4 flex gap-2">
        <Chip on={fac} onClick={() => setFac(!fac)}>Fasilitas</Chip>
        <Chip on={gap} onClick={() => setGap(!gap)}>Kesenjangan Layanan</Chip>
      </div>
      <MapView needs={NEEDS.filter((x) => x.status !== "REJECTED")} facilities={fac} gaps={gap} selectedId={sel} onSelect={setSel} className="mt-3 h-64 rounded-2xl border border-ink-200" />

      {n && (
        <Card className="mt-4">
          <Row tile={<CatTile cat={n.cat} />} title={n.title} sub={`${n.id} · ${n.dusun}`} right={<Pill color={STATUS_COLOR[n.status]}>{STATUS_LABEL[n.status]}</Pill>} />
          <Link href={`/g/usulan/${n.id}`} className="mt-3 block text-xs font-bold text-green-700">Buka detail usulan →</Link>
        </Card>
      )}

      <p className="mb-3 mt-6 text-base font-bold text-ink-900">Kesenjangan layanan terdeteksi</p>
      <div className="space-y-3">
        {GAPS.map((g) => (
          <Card key={g.id} className="flex gap-3">
            <CatTile cat={g.cat} size={40} />
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink-900">{g.title}</p>
              <p className="mt-0.5 text-[12px] font-medium leading-[17px] text-ink-600">{g.detail}</p>
              <p className="mt-1.5 text-[11px] font-semibold" style={{ color: CAT_COLOR[g.cat] }}>{CAT_LABEL[g.cat]}</p>
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-4 text-[11px] font-medium leading-4 text-ink-400">Peta ilustratif. Pada versi produksi memakai Leaflet + OpenStreetMap dan analisis jarak/buffer PostGIS.</p>
    </Shell>
  );
}
