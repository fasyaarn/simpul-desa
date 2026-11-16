"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Shell } from "@/components/Shell";
import { CatTile, Chip, PageHeader, StatusPill, Card, Row } from "@/components/ui";
import { MY_NEEDS, type Need, type NeedStatus } from "@/lib/data";
import { useLocal } from "@/lib/store";

const FILTERS: { label: string; match: (s: NeedStatus) => boolean }[] = [
  { label: "Semua", match: () => true },
  { label: "Diproses", match: (s) => s === "SUBMITTED" || s === "UNDER_REVIEW" },
  { label: "Perlu Revisi", match: (s) => s === "NEEDS_REVISION" },
  { label: "Terverifikasi", match: (s) => s === "VERIFIED" },
];

export default function UsulanSaya() {
  const [f, setF] = useState(0);
  const [extra] = useLocal<Need[]>("simpul.submitted", []);
  const list = [...extra, ...MY_NEEDS].filter((n) => FILTERS[f].match(n.status));
  return (
    <Shell nav={{ role: "m", active: 1 }}>
      <PageHeader title="Usulan Saya" right={<Search size={21} />} />
      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
        {FILTERS.map((x, i) => (
          <Chip key={x.label} on={i === f} onClick={() => setF(i)}>{x.label}</Chip>
        ))}
      </div>
      <Card className="mt-4 space-y-5">
        {list.map((n) => (
          <Row key={n.id} href={`/m/usulan/${n.id}`} tile={<CatTile cat={n.cat} />} title={n.title} sub={`${n.id} · ${n.whenShort}`} right={<StatusPill status={n.status} />} />
        ))}
        {list.length === 0 && <p className="py-6 text-center text-sm font-medium text-ink-600">Belum ada usulan pada kategori ini.</p>}
      </Card>
    </Shell>
  );
}
