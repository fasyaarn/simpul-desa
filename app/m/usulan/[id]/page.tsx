"use client";

import { useParams } from "next/navigation";
import { AlertCircle, Check, ImageIcon, MapPin, Users } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button, Card, CatTile, PageHeader, StatusPill, Pill } from "@/components/ui";
import { MapView } from "@/components/MapView";
import { CAT_COLOR, CAT_LABEL, getNeed, type Need, type NeedStatus } from "@/lib/data";
import { useLocal } from "@/lib/store";
import { cn } from "@/lib/utils";

const STEPS: { key: NeedStatus; label: string }[] = [
  { key: "SUBMITTED", label: "Diajukan" },
  { key: "UNDER_REVIEW", label: "Ditinjau admin" },
  { key: "VERIFIED", label: "Terverifikasi" },
];

export default function DetailUsulan() {
  const { id } = useParams<{ id: string }>();
  const [extra] = useLocal<Need[]>("simpul.submitted", []);
  const n = getNeed(id) ?? extra.find((x) => x.id === id);
  if (!n)
    return (
      <Shell nav={{ role: "m", active: 1 }}>
        <PageHeader title="Usulan" back="/m/usulan" />
        <p className="mt-10 text-center text-sm text-ink-600">Usulan tidak ditemukan.</p>
      </Shell>
    );
  const idx = n.status === "SUBMITTED" ? 0 : n.status === "UNDER_REVIEW" || n.status === "NEEDS_REVISION" ? 1 : n.status === "VERIFIED" ? 2 : 1;
  return (
    <Shell nav={{ role: "m", active: 1 }}>
      <PageHeader title="Detail Usulan" back="/m/usulan" />
      <div className="mt-4 flex items-start gap-3">
        <CatTile cat={n.cat} size={48} />
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-extrabold leading-snug text-ink-900">{n.title}</p>
          <p className="mt-1 text-xs font-medium text-ink-600">{n.id} · {n.when}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <StatusPill status={n.status} />
        <Pill color={CAT_COLOR[n.cat]}>{CAT_LABEL[n.cat]}</Pill>
      </div>

      {n.status === "NEEDS_REVISION" && n.note && (
        <div className="mt-4 flex gap-2.5 rounded-2xl border border-accent-red/30 bg-accent-red/10 p-3.5">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-accent-red" />
          <div>
            <p className="text-[13px] font-bold text-accent-red">Catatan dari admin desa</p>
            <p className="mt-1 text-[12.5px] font-medium leading-[18px] text-ink-900">{n.note}</p>
          </div>
        </div>
      )}
      {n.status === "REJECTED" && n.note && (
        <div className="mt-4 rounded-2xl border border-ink-200 bg-ink-200/40 p-3.5">
          <p className="text-[13px] font-bold text-ink-900">Alasan penolakan</p>
          <p className="mt-1 text-[12.5px] font-medium leading-[18px] text-ink-600">{n.note}</p>
        </div>
      )}

      <Card className="mt-4">
        <p className="mb-3 text-sm font-bold text-ink-900">Progres Usulan</p>
        <ol className="space-y-0">
          {STEPS.map((s, i) => {
            const done = n.status !== "REJECTED" && i <= idx && !(n.status === "NEEDS_REVISION" && i === idx);
            const current = i === idx && n.status !== "VERIFIED";
            return (
              <li key={s.key} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className={cn("grid h-6 w-6 place-items-center rounded-full border-2", done ? "border-green-700 bg-green-700 text-white" : current ? "border-green-700 bg-white" : "border-ink-200 bg-white")}>
                    {done && <Check size={13} strokeWidth={3.4} />}
                  </span>
                  {i < STEPS.length - 1 && <span className={cn("h-7 w-[2px]", done ? "bg-green-700" : "bg-ink-200")} />}
                </div>
                <p className={cn("pt-0.5 text-[13px]", done || current ? "font-bold text-ink-900" : "font-medium text-ink-400")}>{s.label}</p>
              </li>
            );
          })}
        </ol>
      </Card>

      <Card className="mt-4 space-y-3">
        <p className="text-sm font-bold text-ink-900">Deskripsi</p>
        <p className="text-[13px] font-medium leading-5 text-ink-600">{n.desc}</p>
        <div className="flex items-center gap-2 text-[12.5px] font-semibold text-ink-900"><Users size={15} className="text-green-700" /> {n.beneficiaries} jiwa · {n.group}</div>
        <div className="flex items-center gap-2 text-[12.5px] font-semibold text-ink-900"><ImageIcon size={15} className="text-green-700" /> {n.photos} foto terlampir</div>
        <div className="flex items-center gap-2 text-[12.5px] font-semibold text-ink-900"><MapPin size={15} className="text-green-700" /> {n.dusun} · {n.coords}</div>
      </Card>

      <MapView needs={[n]} className="mt-4 h-36 rounded-2xl border border-ink-200" />

      {n.status === "NEEDS_REVISION" && (
        <div className="mt-5">
          <Button href="/m/ajukan">Perbaiki &amp; Kirim Ulang</Button>
        </div>
      )}
    </Shell>
  );
}
