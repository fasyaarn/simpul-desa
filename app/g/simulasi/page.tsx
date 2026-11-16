"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Users } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button, Card, CatTile, PageHeader, Pill } from "@/components/ui";
import { Donut, Slider } from "@/components/charts";
import { CAT_COLOR, CAT_LABEL, type CatKey } from "@/lib/data";
import { DEFAULT_WEIGHTS, evaluate, optimize, rankPrograms, rp } from "@/lib/logic";
import { DEFAULT_BUDGET } from "@/lib/data";
import { useLocal, type SimState } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function Simulasi() {
  const router = useRouter();
  const [w] = useLocal<number[]>("simpul.weights", DEFAULT_WEIGHTS);
  const programs = useMemo(() => rankPrograms(w), [w]);
  const [sim, setSim] = useLocal<SimState>("simpul.sim", { budget: DEFAULT_BUDGET, selected: ["P01", "P02", "P03", "P04"] });
  const r = evaluate(programs, sim.selected, sim.budget);
  const over = r.remaining < 0;

  const toggle = (id: string) => setSim({ ...sim, selected: sim.selected.includes(id) ? sim.selected.filter((x) => x !== id) : [...sim.selected, id] });

  const byCat = (Object.keys(CAT_LABEL) as CatKey[])
    .map((c) => ({ label: CAT_LABEL[c], color: CAT_COLOR[c], value: programs.filter((p) => sim.selected.includes(p.id) && p.cat === c).reduce((a, p) => a + p.cost, 0) }))
    .filter((s) => s.value > 0);

  return (
    <Shell
      nav={{ role: "g", active: 2 }}
      footer={<Button disabled={over || r.count === 0} onClick={() => router.push("/g/skenario")}>Bandingkan Skenario</Button>}
    >
      <PageHeader title="Simulasi Anggaran" />
      <Card className="mt-4">
        <div className="flex items-end justify-between">
          <div><p className="text-xs font-medium text-ink-600">Anggaran tersedia</p><p className="text-2xl font-extrabold text-ink-900">{rp(sim.budget)}</p></div>
          <Pill color={over ? "#E5484D" : "#1B8A5F"}>{over ? `Kurang ${rp(-r.remaining)}` : `Sisa ${rp(r.remaining)}`}</Pill>
        </div>
        <div className="mt-3"><Slider label="Anggaran" min={100} max={850} value={sim.budget} onChange={(v) => setSim({ ...sim, budget: v })} /></div>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button variant="soft" icon={Sparkles} iconFirst onClick={() => setSim({ ...sim, selected: optimize(programs, sim.budget, (p) => p.score) })}>Maks. Skor</Button>
        <Button variant="soft" icon={Users} iconFirst onClick={() => setSim({ ...sim, selected: optimize(programs, sim.budget, (p) => p.beneficiaries) })}>Maks. Manfaat</Button>
      </div>

      <Card className="mt-4 flex items-center gap-4">
        <Donut segments={byCat} center={rp(r.totalCost)} sub={`${r.count} program`} />
        <div className="flex-1 space-y-2.5 text-[12px]">
          <div><p className="font-medium text-ink-600">Penerima manfaat</p><p className="text-base font-extrabold text-ink-900">{r.beneficiaries.toLocaleString("id-ID")} jiwa</p></div>
          <div><p className="font-medium text-ink-600">Total skor</p><p className="text-base font-extrabold text-ink-900">{r.totalScore}</p></div>
        </div>
      </Card>

      <p className="mb-3 mt-5 text-base font-bold text-ink-900">Pilih program</p>
      <div className="space-y-2.5">
        {programs.map((p) => {
          const on = sim.selected.includes(p.id);
          return (
            <button key={p.id} type="button" onClick={() => toggle(p.id)} className={cn("flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition", on ? "border-green-600 bg-green-50" : "border-ink-200 bg-white")}>
              <CatTile cat={p.cat} size={38} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-bold text-ink-900">{p.name}</p>
                <p className="text-[11px] font-medium text-ink-600">{rp(p.cost)} · {p.beneficiaries} jiwa · skor {p.score}</p>
              </div>
              <span className={cn("grid h-6 w-6 place-items-center rounded-full border-2", on ? "border-green-700 bg-green-700 text-white" : "border-ink-200")}>
                {on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-[11px] font-medium leading-4 text-ink-400">Hasil simulasi adalah rekomendasi pendukung keputusan, bukan keputusan final.</p>
    </Shell>
  );
}
