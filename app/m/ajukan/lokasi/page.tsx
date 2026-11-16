"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, LocateFixed, Plus } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button, Checkbox, PageHeader, Stepper } from "@/components/ui";
import { CenterPin, MapBackdrop, MapFab } from "@/components/MapView";
import { EMPTY_DRAFT, useLocal, type Draft } from "@/lib/store";
import type { Need } from "@/lib/data";

export default function Lokasi() {
  const router = useRouter();
  const [d] = useLocal<Draft>("simpul.draft", EMPTY_DRAFT);
  const [list, setList] = useLocal<Need[]>("simpul.submitted", []);
  const [photos, setPhotos] = useState(2);
  const [ok, setOk] = useState(true);

  const submit = () => {
    const n: Need = {
      id: "USL-0150",
      title: d.title,
      cat: d.cat as Need["cat"],
      desc: d.desc,
      when: "16 Nov 2026, 15:02",
      whenShort: "Baru saja",
      status: "SUBMITTED",
      beneficiaries: parseInt(d.beneficiaries) || 40,
      group: d.group,
      coords: "-6.9178, 107.6193",
      x: 0.47,
      y: 0.42,
      by: "Budi Santoso",
      dusun: "Dusun 2",
      mine: true,
      photos,
    };
    setList([n, ...list.filter((x) => x.id !== n.id)]);
    router.push("/m/ajukan/sukses");
  };

  return (
    <Shell nav={{ role: "m", active: 2 }} footer={<Button disabled={!ok} onClick={submit}>Kirim Usulan</Button>}>
      <PageHeader title="Ajukan Kebutuhan" back="/m/ajukan" />
      <div className="mt-3"><Stepper step={2} title="Lokasi & bukti" /></div>

      <p className="mb-2 mt-5 text-xs font-semibold text-ink-600">Tandai lokasi pada peta</p>
      <div className="relative h-52 overflow-hidden rounded-2xl border border-ink-200">
        <MapBackdrop />
        <CenterPin />
        <MapFab className="absolute right-3 top-3" />
        <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-ink-900 shadow-soft">-6.9178, 107.6193</span>
      </div>
      <button type="button" className="mt-2.5 flex items-center gap-1.5 text-[12.5px] font-bold text-green-700"><LocateFixed size={15} /> Gunakan lokasi saya saat ini</button>

      <p className="mb-2 mt-5 text-xs font-semibold text-ink-600">Foto bukti ({photos}/5)</p>
      <div className="flex gap-3">
        {Array.from({ length: photos }).map((_, i) => (
          <div key={i} className="h-[78px] w-[78px] rounded-2xl bg-gradient-to-br from-green-100 to-green-500/40" />
        ))}
        {photos < 5 && (
          <button type="button" onClick={() => setPhotos(photos + 1)} className="grid h-[78px] w-[78px] place-items-center rounded-2xl border-[1.5px] border-dashed border-green-600 bg-green-50 text-green-700">
            <span className="flex flex-col items-center gap-1 text-[10.5px] font-bold"><Camera size={20} /><span className="flex items-center gap-0.5"><Plus size={10} />Foto</span></span>
          </button>
        )}
      </div>

      <div className="mt-5">
        <Checkbox checked={ok} onChange={setOk}>Saya menyatakan informasi yang dikirim benar dan dapat dipertanggungjawabkan.</Checkbox>
      </div>
    </Shell>
  );
}
