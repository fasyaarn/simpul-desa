"use client";

import Link from "next/link";
import { Handshake, MapPin, Landmark } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Card, CatTile, PageHeader, Pill } from "@/components/ui";
import { SHARED_OPPS } from "@/lib/data";
import { rp } from "@/lib/logic";

export default function Koordinasi() {
  return (
    <Shell nav={{ role: "g", active: 0 }}>
      <PageHeader title="Koordinasi Lintas Desa" back="/g/beranda" />
      <p className="mt-2 text-xs font-medium leading-[18px] text-ink-600">Kebutuhan serupa dari desa sekitar. Bandingkan pengadaan sendiri-sendiri dengan pengadaan bersama yang dipakai bergantian.</p>
      <div className="mt-4 space-y-4">
        {SHARED_OPPS.map((o) => {
          const separate = o.unitCost * o.villages.length;
          const saving = separate - o.unitCost;
          return (
            <Link key={o.id} href={`/g/koordinasi/${o.id}`} className="block">
              <Card>
                <div className="flex items-start gap-3">
                  <CatTile cat={o.cat} size={44} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14.5px] font-extrabold leading-snug text-ink-900">{o.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-[11.5px] font-medium text-ink-600"><MapPin size={12} />{o.villages.map((v) => v.name).join(" · ")}</p>
                  </div>
                </div>
                {o.route === "desa" ? (
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-green-50 px-3 py-2.5">
                    <span className="flex items-center gap-1.5 text-[12px] font-bold text-green-800"><Handshake size={15} />Potensi hemat</span>
                    <span className="text-[13px] font-extrabold text-green-800">{rp(saving)}</span>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-accent-orange/10 px-3 py-2.5 text-[12px] font-bold text-ink-900"><Landmark size={15} className="text-accent-orange" />Disarankan lewat pemerintah kabupaten</div>
                )}
                <div className="mt-3 flex gap-2"><Pill color="#5F6F68">{o.villages.length} desa</Pill><Pill color="#5F6F68">≤ {o.maxDistanceKm} km</Pill></div>
              </Card>
            </Link>
          );
        })}
      </div>
    </Shell>
  );
}
