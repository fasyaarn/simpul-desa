"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Card, CatTile, PageHeader, Pill, Row, Seg, StatusPill } from "@/components/ui";
import { NEEDS, type NeedStatus } from "@/lib/data";
import { useLocal } from "@/lib/store";

const FILTERS: { label: string; match: (s: NeedStatus) => boolean }[] = [
  { label: "Baru", match: (s) => s === "SUBMITTED" },
  { label: "Ditinjau", match: (s) => s === "UNDER_REVIEW" },
  { label: "Revisi", match: (s) => s === "NEEDS_REVISION" },
  { label: "Selesai", match: (s) => s === "VERIFIED" || s === "REJECTED" },
];

export default function AntreanVerifikasi() {
  const [f, setF] = useState(0);
  const [over] = useLocal<Record<string, NeedStatus>>("simpul.verif", {});
  const list = NEEDS.map((n) => ({ ...n, status: over[n.id] ?? n.status })).filter((n) => FILTERS[f].match(n.status));
  return (
    <Shell nav={{ role: "g", active: 0 }}>
      <PageHeader title="Verifikasi Usulan" back="/g/beranda" />
      <div className="mt-4"><Seg items={FILTERS.map((x) => x.label)} active={f} onChange={setF} /></div>
      <Card className="mt-4 space-y-5">
        {list.map((n) => (
          <Row
            key={n.id}
            href={`/g/usulan/${n.id}`}
            tile={<CatTile cat={n.cat} />}
            title={n.title}
            sub={<span className="flex items-center gap-1.5">{n.id} · {n.by}{n.dupOf && <span className="inline-flex items-center gap-0.5 text-accent-orange"><Copy size={11} />duplikat?</span>}</span>}
            right={<StatusPill status={n.status} />}
          />
        ))}
        {list.length === 0 && <p className="py-6 text-center text-sm font-medium text-ink-600">Tidak ada usulan pada tahap ini.</p>}
      </Card>
      <p className="mt-3 px-1"><Pill color="#97A59F">{list.length} usulan</Pill></p>
    </Shell>
  );
}
