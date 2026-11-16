"use client";

import { Check } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button, Card } from "@/components/ui";
import { useLocal } from "@/lib/store";
import type { Need } from "@/lib/data";

export default function Sukses() {
  const [list] = useLocal<Need[]>("simpul.submitted", []);
  const n = list[0];
  return (
    <Shell
      footer={
        <div className="space-y-3">
          <Button href={n ? `/m/usulan/${n.id}` : "/m/usulan"}>Lihat Status Usulan</Button>
          <Button href="/m/beranda" variant="soft">Kembali ke Beranda</Button>
        </div>
      }
    >
      <div className="flex flex-col items-center pt-16 text-center">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-green-100">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-green-700 text-white shadow-card"><Check size={34} strokeWidth={3} /></span>
        </span>
        <h1 className="mt-6 text-[22px] font-extrabold text-ink-900">Usulan Terkirim!</h1>
        <p className="mt-2 max-w-[290px] text-[13.5px] font-medium leading-5 text-ink-600">Terima kasih. Admin desa akan meninjau usulan Anda dan memperbarui statusnya.</p>
      </div>
      {n && (
        <Card tone="mint" className="mt-8 space-y-2.5">
          <div className="flex justify-between text-[13px]"><span className="font-medium text-ink-600">Nomor usulan</span><span className="font-extrabold text-ink-900">{n.id}</span></div>
          <div className="flex justify-between gap-4 text-[13px]"><span className="font-medium text-ink-600">Judul</span><span className="text-right font-bold text-ink-900">{n.title}</span></div>
          <div className="flex justify-between text-[13px]"><span className="font-medium text-ink-600">Status</span><span className="font-bold text-accent-blue">Diajukan</span></div>
        </Card>
      )}
    </Shell>
  );
}
