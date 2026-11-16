"use client";

import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Card, CatTile, PageHeader, Pill, Progress } from "@/components/ui";
import { CRITERIA } from "@/lib/data";
import { DEFAULT_WEIGHTS, rankPrograms, rp } from "@/lib/logic";
import { useLocal } from "@/lib/store";

export default function Prioritas() {
  const [w] = useLocal<number[]>("simpul.weights", DEFAULT_WEIGHTS);
  const ranked = rankPrograms(w);
  return (
    <Shell nav={{ role: "g", active: 3 }}>
      <PageHeader title="Peringkat Prioritas" right={<Link href="/g/bobot" aria-label="Atur bobot"><SlidersHorizontal size={21} /></Link>} />
      <p className="mt-2 text-xs font-medium leading-[18px] text-ink-600">Skor = Σ (bobot × nilai kriteria), skala 0–100. Ubah bobot untuk melihat peringkat berubah.</p>
      <Link href="/g/bobot" className="mt-3 flex items-center justify-between rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-[13px] font-bold text-green-800">
        Atur bobot kriteria <span className="text-xs font-semibold text-green-700">{CRITERIA.map((_, i) => w[i]).join(" · ")}</span>
      </Link>
      <div className="mt-4 space-y-3">
        {ranked.map((p, i) => (
          <Card key={p.id}>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green-700 text-sm font-extrabold text-white">{i + 1}</span>
              <CatTile cat={p.cat} size={38} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink-900">{p.name}</p>
                <p className="text-[11.5px] font-medium text-ink-600">{rp(p.cost)} · {p.beneficiaries} jiwa</p>
              </div>
              <Pill color="#1B8A5F">{p.score}</Pill>
            </div>
            <div className="mt-3"><Progress value={p.score} /></div>
          </Card>
        ))}
      </div>
      <div className="mt-5"><Link href="/g/simulasi" className="block rounded-full bg-green-700 py-4 text-center text-[15px] font-bold text-white shadow-card">Lanjut ke Simulasi Anggaran</Link></div>
    </Shell>
  );
}
