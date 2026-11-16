"use client";

import { useRouter } from "next/navigation";
import { Shell } from "@/components/Shell";
import { Button, Card, PageHeader } from "@/components/ui";
import { Slider } from "@/components/charts";
import { CRITERIA } from "@/lib/data";
import { DEFAULT_WEIGHTS } from "@/lib/logic";
import { useLocal } from "@/lib/store";

export default function Bobot() {
  const router = useRouter();
  const [w, setW] = useLocal<number[]>("simpul.weights", DEFAULT_WEIGHTS);
  const total = w.reduce((a, b) => a + b, 0);
  return (
    <Shell
      nav={{ role: "g", active: 3 }}
      footer={
        <div className="grid grid-cols-2 gap-3">
          <Button variant="soft" onClick={() => setW(DEFAULT_WEIGHTS)}>Reset</Button>
          <Button onClick={() => router.push("/g/prioritas")}>Terapkan</Button>
        </div>
      }
    >
      <PageHeader title="Bobot Kriteria" back="/g/prioritas" />
      <Card tone="mint" className="mt-4 flex items-center justify-between">
        <div><p className="text-xs font-medium text-ink-600">Total bobot</p><p className="text-xl font-extrabold text-green-800">{total}</p></div>
        <p className="max-w-[190px] text-right text-[11.5px] font-medium leading-4 text-ink-600">Bobot dinormalisasi otomatis sehingga hasil tetap pada skala 0–100.</p>
      </Card>
      <div className="mt-5 space-y-5">
        {CRITERIA.map((c, i) => (
          <div key={c.key}>
            <div className="mb-2 flex items-end justify-between">
              <div><p className="text-sm font-bold text-ink-900">{c.name}</p><p className="text-[11.5px] font-medium text-ink-600">{c.desc}</p></div>
              <span className="text-lg font-extrabold text-green-800">{w[i]}</span>
            </div>
            <Slider label={c.name} value={w[i]} onChange={(v) => setW(w.map((x, j) => (j === i ? v : x)))} />
          </div>
        ))}
      </div>
    </Shell>
  );
}
