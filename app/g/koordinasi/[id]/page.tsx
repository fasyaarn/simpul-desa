"use client";

import { useParams, useRouter } from "next/navigation";
import { Landmark, Plus } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button, Card, CatTile, PageHeader, Pill } from "@/components/ui";
import { DEFAULT_BUDGET, SHARED_OPPS } from "@/lib/data";
import { rp } from "@/lib/logic";
import { useLocal, type SimState } from "@/lib/store";

const COLORS = ["#1B8A5F", "#4C7DF0", "#F59E42"];

export default function KoordinasiDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const o = SHARED_OPPS.find((x) => x.id === id);
  const [sim, setSim] = useLocal<SimState>("simpul.sim", { budget: DEFAULT_BUDGET, selected: ["P01", "P02", "P03", "P04"] });
  if (!o)
    return (
      <Shell nav={{ role: "g", active: 0 }}>
        <PageHeader title="Koordinasi" back="/g/koordinasi" />
      </Shell>
    );
  const n = o.villages.length;
  const separate = o.unitCost * n;
  const share = Math.round(o.unitCost / n);
  const saving = separate - o.unitCost;
  const pct = Math.round((saving / separate) * 100);
  const farmers = o.villages.reduce((a, v) => a + v.farmers, 0);

  const addToSim = () => {
    if (o.programId && !sim.selected.includes(o.programId)) setSim({ ...sim, selected: [...sim.selected, o.programId] });
    router.push("/g/simulasi");
  };

  return (
    <Shell nav={{ role: "g", active: 0 }} footer={o.route === "desa" ? <Button icon={Plus} iconFirst onClick={addToSim}>Masukkan ke Simulasi</Button> : undefined}>
      <PageHeader title="Peluang Koordinasi" back="/g/koordinasi" />
      <div className="mt-4 flex items-start gap-3">
        <CatTile cat={o.cat} size={48} />
        <div>
          <p className="text-[17px] font-extrabold leading-snug text-ink-900">{o.title}</p>
          <p className="mt-1 text-xs font-medium text-ink-600">{n} desa · {farmers} petani · jarak maks. {o.maxDistanceKm} km</p>
        </div>
      </div>
      <p className="mt-3 text-[13px] font-medium leading-5 text-ink-600">{o.desc}</p>

      <p className="mb-2 mt-5 text-base font-bold text-ink-900">Bandingkan alternatif</p>
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-[11.5px] font-semibold text-ink-600">Beli sendiri-sendiri</p>
          <p className="mt-1 text-lg font-extrabold text-ink-900">{rp(separate)}</p>
          <p className="mt-1 text-[11px] font-medium text-ink-600">{n} unit · {rp(o.unitCost)} per desa</p>
        </Card>
        <Card tone="mint" className="!border-green-600">
          <p className="text-[11.5px] font-semibold text-green-700">Pengadaan bersama</p>
          <p className="mt-1 text-lg font-extrabold text-green-800">{rp(o.unitCost)}</p>
          <p className="mt-1 text-[11px] font-medium text-ink-600">1 unit · ± {rp(share)} per desa</p>
        </Card>
      </div>

      {o.route === "desa" ? (
        <>
          <Card tone="mint" className="mt-3 flex items-center justify-between">
            <span className="text-[13px] font-bold text-green-800">Potensi hemat</span>
            <span className="text-base font-extrabold text-green-800">{rp(saving)} ({pct}%)</span>
          </Card>
          <p className="mt-2 px-1 text-[11px] font-medium text-ink-400">Belum termasuk biaya operasional bersama ± {rp(o.opexYear)} per tahun yang dibagi antar desa.</p>

          <p className="mb-2 mt-5 text-base font-bold text-ink-900">Jadwal pemakaian bergilir</p>
          <Card className="space-y-3.5">
            {o.villages.map((v, i) => (
              <div key={v.name} className="flex items-center gap-3">
                <span className="h-9 w-1.5 rounded-full" style={{ background: COLORS[i] }} />
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-ink-900">{v.name}</p>
                  <p className="text-[11px] font-medium text-ink-600">{v.farmers} petani</p>
                </div>
                <Pill color={COLORS[i]}>{v.slot}</Pill>
              </div>
            ))}
            <div className="flex h-2.5 overflow-hidden rounded-full">
              {o.villages.map((v, i) => <span key={v.name} className="flex-1" style={{ background: COLORS[i] }} />)}
            </div>
            <p className="text-[11px] font-medium text-ink-400">Contoh satu putaran. Jadwal nyata disepakati bersama menyesuaikan musim tanam.</p>
          </Card>
        </>
      ) : (
        <Card className="mt-3 flex gap-2.5 !border-accent-orange/40 bg-accent-orange/10">
          <Landmark size={18} className="mt-0.5 shrink-0 text-accent-orange" />
          <p className="text-[12.5px] font-medium leading-[18px] text-ink-900">Biaya melampaui kapasitas Dana Desa tiga desa. Lebih tepat dikoordinasikan lewat pemerintah kabupaten atau program sektoral.</p>
        </Card>
      )}

      <Card className="mt-4"><p className="text-[12.5px] font-medium leading-[18px] text-ink-600"><b className="text-ink-900">Catatan:</b> {o.note}</p></Card>
      <p className="mt-3 text-[11px] font-medium leading-4 text-ink-400">Rekomendasi pendukung diskusi antar pemerintah desa; pengadaan resmi tetap melalui mekanisme yang berlaku.</p>
    </Shell>
  );
}
