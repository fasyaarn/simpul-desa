"use client";

import { useState } from "react";
import { FileCheck2, Info } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button, Card, CatTile, Field, PageHeader, Row } from "@/components/ui";
import { PROGRAMS } from "@/lib/data";
import { rp } from "@/lib/logic";
import { useLocal, type Chosen } from "@/lib/store";

interface Decision {
  label: string;
  ids: string[];
  budget: number;
  note: string;
  date: string;
}

export default function Keputusan() {
  const [chosen] = useLocal<Chosen | null>("simpul.chosen", null);
  const [decisions, setDecisions] = useLocal<Decision[]>("simpul.decisions", []);
  const [note, setNote] = useState("Dibahas pada musyawarah desa; prioritas pada air bersih dan akses jalan.");
  const progs = chosen ? PROGRAMS.filter((p) => chosen.ids.includes(p.id)) : [];

  const save = () => {
    if (!chosen) return;
    setDecisions([{ ...chosen, note, date: "16 Nov 2026" }, ...decisions]);
  };

  return (
    <Shell nav={{ role: "g", active: 2 }} footer={<Button icon={FileCheck2} disabled={!chosen} onClick={save}>Simpan Keputusan</Button>}>
      <PageHeader title="Dokumentasi Keputusan" back="/g/skenario" />
      <div className="mt-3 flex gap-2.5 rounded-2xl border border-green-100 bg-green-50 p-3.5">
        <Info size={17} className="mt-0.5 shrink-0 text-green-700" />
        <p className="text-[12px] font-medium leading-[17px] text-ink-600">Rekomendasi sistem bukan keputusan final. Catat dasar keputusan musyawarah agar dapat dipertanggungjawabkan dan diaudit.</p>
      </div>

      {chosen ? (
        <>
          <Card className="mt-4 space-y-4">
            <div className="flex justify-between"><p className="text-sm font-bold text-ink-900">{chosen.label}</p><p className="text-sm font-extrabold text-green-800">{rp(progs.reduce((a, p) => a + p.cost, 0))}</p></div>
            {progs.map((p) => <Row key={p.id} tile={<CatTile cat={p.cat} size={36} />} title={p.name} sub={`${p.beneficiaries} jiwa`} right={<span className="text-xs font-bold text-ink-900">{rp(p.cost)}</span>} />)}
          </Card>
          <div className="mt-4"><Field label="Catatan / dasar keputusan" value={note} onChange={setNote} multiline rows={4} /></div>
        </>
      ) : (
        <Card className="mt-4 text-center text-sm font-medium text-ink-600">Belum ada skenario dipilih. <a href="/g/skenario" className="font-bold text-green-700">Pilih skenario</a></Card>
      )}

      {decisions.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-base font-bold text-ink-900">Riwayat Keputusan</p>
          {decisions.map((d, i) => (
            <Card key={i}>
              <p className="text-[13px] font-bold text-ink-900">{d.label} · {rp(d.budget)}</p>
              <p className="mt-0.5 text-[11.5px] font-medium text-ink-600">{d.date} · {d.ids.length} program disetujui</p>
              <p className="mt-2 text-[12px] font-medium leading-[17px] text-ink-600">{d.note}</p>
            </Card>
          ))}
        </div>
      )}
    </Shell>
  );
}
