"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { AlertTriangle, Check, ImageIcon, MapPin, Users } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button, Card, CatTile, Field, PageHeader, Pill, StatusPill } from "@/components/ui";
import { MapView } from "@/components/MapView";
import { CAT_COLOR, CAT_LABEL, getNeed, type NeedStatus } from "@/lib/data";
import { useLocal } from "@/lib/store";

export default function VerifikasiDetail() {
  const { id } = useParams<{ id: string }>();
  const base = getNeed(id);
  const [over, setOver] = useLocal<Record<string, NeedStatus>>("simpul.verif", {});
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");
  if (!base)
    return (
      <Shell nav={{ role: "g", active: 0 }}>
        <PageHeader title="Usulan" back="/g/usulan" />
      </Shell>
    );
  const status = over[id] ?? base.status;
  const dup = base.dupOf ? getNeed(base.dupOf) : undefined;
  const act = (s: NeedStatus, msg: string) => {
    setOver({ ...over, [id]: s });
    setToast(msg);
  };
  const closed = status === "VERIFIED" || status === "REJECTED";

  return (
    <Shell nav={{ role: "g", active: 0 }}>
      <PageHeader title="Tinjau Usulan" back="/g/usulan" />
      <div className="mt-4 flex items-start gap-3">
        <CatTile cat={base.cat} size={48} />
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-extrabold leading-snug text-ink-900">{base.title}</p>
          <p className="mt-1 text-xs font-medium text-ink-600">{base.id} · oleh {base.by} · {base.when}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <StatusPill status={status} />
        <Pill color={CAT_COLOR[base.cat]}>{CAT_LABEL[base.cat]}</Pill>
      </div>

      {dup && (
        <div className="mt-4 flex gap-2.5 rounded-2xl border border-accent-orange/40 bg-accent-orange/10 p-3.5">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-accent-orange" />
          <div>
            <p className="text-[13px] font-bold text-ink-900">Kemungkinan duplikat</p>
            <p className="mt-1 text-[12.5px] font-medium leading-[18px] text-ink-600">Sistem menemukan usulan serupa <b>{dup.id}</b> ({dup.title}) pada jarak {base.dupDistance}. Periksa sebelum memverifikasi.</p>
          </div>
        </div>
      )}

      <Card className="mt-4 space-y-3">
        <p className="text-sm font-bold text-ink-900">Informasi usulan</p>
        <p className="text-[13px] font-medium leading-5 text-ink-600">{base.desc}</p>
        <div className="flex items-center gap-2 text-[12.5px] font-semibold"><Users size={15} className="text-green-700" /> {base.beneficiaries} jiwa · {base.group}</div>
        <div className="flex items-center gap-2 text-[12.5px] font-semibold"><ImageIcon size={15} className="text-green-700" /> {base.photos} foto bukti</div>
        <div className="flex items-center gap-2 text-[12.5px] font-semibold"><MapPin size={15} className="text-green-700" /> {base.dusun} · {base.coords}</div>
      </Card>
      <MapView needs={[base]} facilities className="mt-4 h-36 rounded-2xl border border-ink-200" />

      {!closed && (
        <div className="mt-5 space-y-4">
          <Field label="Catatan verifikator (wajib untuk revisi / penolakan)" value={note} onChange={setNote} multiline rows={3} placeholder="Tuliskan alasan atau permintaan perbaikan" />
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" disabled={!note.trim()} onClick={() => act("NEEDS_REVISION", "Usulan dikembalikan untuk revisi")}>Minta Revisi</Button>
            <Button variant="danger" disabled={!note.trim()} onClick={() => act("REJECTED", "Usulan ditolak")}>Tolak</Button>
          </div>
          <Button icon={Check} onClick={() => act("VERIFIED", "Usulan diverifikasi")}>Verifikasi Usulan</Button>
        </div>
      )}
      {closed && <p className="mt-5 rounded-2xl bg-green-50 p-3.5 text-center text-[12.5px] font-semibold text-green-800">Tahap verifikasi selesai. Tindakan tercatat pada log aktivitas.</p>}
      <p className="mt-3 text-center text-[11px] font-medium text-ink-400">Perubahan disimpan lokal pada prototipe ini.</p>
      {toast && <div className="fixed inset-x-0 bottom-24 z-50 mx-auto w-fit rounded-full bg-ink-900 px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-phone">{toast}</div>}
    </Shell>
  );
}
