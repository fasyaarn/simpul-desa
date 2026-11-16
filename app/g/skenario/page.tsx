"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button, Card, PageHeader, Pill } from "@/components/ui";
import { DEFAULT_BUDGET } from "@/lib/data";
import { DEFAULT_WEIGHTS, evaluate, optimize, rankPrograms, rp } from "@/lib/logic";
import { useLocal, type Chosen, type SimState } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function Skenario() {
  const router = useRouter();
  const [w] = useLocal<number[]>("simpul.weights", DEFAULT_WEIGHTS);
  const [sim] = useLocal<SimState>("simpul.sim", { budget: DEFAULT_BUDGET, selected: ["P01", "P02", "P03", "P04"] });
  const [chosen, setChosen] = useLocal<Chosen | null>("simpul.chosen", null);
  const programs = useMemo(() => rankPrograms(w), [w]);

  const scen = [
    { label: "Urgency-Oriented", sub: "Dahulukan kebutuhan paling mendesak", ids: optimize(programs, sim.budget, (p) => Math.round((p.crit[0] / 100) ** 6 * 10000)) },
    { label: "Equity-Oriented", sub: "Perluas pemerataan & kelompok rentan", ids: optimize(programs, sim.budget, (p) => Math.round(p.crit[3] * (p.beneficiaries <= 320 ? 2 : 1))) },
    { label: "Resource-Efficient", sub: "Manfaat terbanyak dari anggaran tersedia", ids: optimize(programs, sim.budget, (p) => p.beneficiaries) },
    { label: "Collaborative", sub: "Utamakan pengadaan bersama lintas desa", ids: optimize(programs, sim.budget, (p) => p.score + (p.shared ? 25 : 0)) },
    { label: "Pilihan Manual", sub: "Dari halaman simulasi", ids: sim.selected },
  ].map((s) => ({ ...s, r: evaluate(programs, s.ids, sim.budget) }));

  const best = (f: (i: number) => number) => Math.max(...scen.map((_, i) => f(i)));
  const bScore = best((i) => scen[i].r.totalScore), bBen = best((i) => scen[i].r.beneficiaries);

  return (
    <Shell nav={{ role: "g", active: 2 }}>
      <PageHeader title="Perbandingan Skenario" back="/g/simulasi" />
      <p className="mt-2 text-xs font-medium text-ink-600">Anggaran simulasi {rp(sim.budget)}. Pilih satu skenario sebagai rekomendasi untuk dicatat.</p>
      <div className="mt-4 space-y-4">
        {scen.map((s) => {
          const picked = chosen?.label === s.label;
          const over = s.r.remaining < 0;
          return (
            <Card key={s.label} className={cn(picked && "!border-green-600 ring-2 ring-green-100")}>
              <div className="flex items-center justify-between">
                <div><p className="text-[15px] font-extrabold text-ink-900">{s.label}</p><p className="text-[11.5px] font-medium text-ink-600">{s.sub}</p></div>
                {picked ? <Pill color="#1B8A5F"><Check size={12} className="mr-1" />Dipilih</Pill> : over && <Pill color="#E5484D">Melebihi anggaran</Pill>}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-green-50 py-2"><p className="text-[10.5px] font-medium text-ink-600">Biaya</p><p className="text-[13px] font-extrabold text-ink-900">{rp(s.r.totalCost)}</p></div>
                <div className={cn("rounded-xl py-2", s.r.beneficiaries === bBen ? "bg-green-100" : "bg-green-50")}><p className="text-[10.5px] font-medium text-ink-600">Manfaat</p><p className="text-[13px] font-extrabold text-ink-900">{s.r.beneficiaries.toLocaleString("id-ID")}</p></div>
                <div className={cn("rounded-xl py-2", s.r.totalScore === bScore ? "bg-green-100" : "bg-green-50")}><p className="text-[10.5px] font-medium text-ink-600">Skor</p><p className="text-[13px] font-extrabold text-ink-900">{s.r.totalScore}</p></div>
              </div>
              <ul className="mt-3 space-y-1">
                {programs.filter((p) => s.ids.includes(p.id)).map((p) => <li key={p.id} className="flex justify-between text-[12px] font-medium text-ink-600"><span className="truncate pr-2">{p.name}</span><span className="shrink-0 font-semibold text-ink-900">{rp(p.cost)}</span></li>)}
              </ul>
              <div className="mt-3">
                <Button variant={picked ? "soft" : "outline"} disabled={over} onClick={() => setChosen({ label: s.label, ids: s.ids, budget: sim.budget })}>{picked ? "Terpilih" : "Pilih Skenario Ini"}</Button>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="mt-5"><Button disabled={!chosen} onClick={() => router.push("/g/keputusan")}>Catat Keputusan</Button></div>
    </Shell>
  );
}
