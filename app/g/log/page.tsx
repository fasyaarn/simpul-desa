"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { Avatar, Card, Chip, PageHeader, Pill } from "@/components/ui";
import { LOGS } from "@/lib/data";

const KIND_COLOR = { Verifikasi: "#1B8A5F", Keputusan: "#4C7DF0", Simulasi: "#8B5CF6", Akun: "#F59E42" } as const;

export default function LogAktivitas() {
  const kinds = ["Semua", "Verifikasi", "Keputusan", "Simulasi", "Akun"] as const;
  const [k, setK] = useState<(typeof kinds)[number]>("Semua");
  const list = LOGS.filter((l) => k === "Semua" || l.kind === k);
  const groups = [...new Set(list.map((l) => l.group))];
  return (
    <Shell nav={{ role: "g", active: 4 }}>
      <PageHeader title="Log Aktivitas" back="/g/profil" />
      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
        {kinds.map((x) => <Chip key={x} on={k === x} onClick={() => setK(x)}>{x}</Chip>)}
      </div>
      {groups.map((g) => (
        <div key={g} className="mt-5">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-ink-400">{g}</p>
          <Card className="space-y-4">
            {list.filter((l) => l.group === g).map((l, i) => (
              <div key={i} className="flex gap-3">
                <Avatar initials={l.initials} size={38} />
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-medium leading-[18px] text-ink-600"><b className="font-bold text-ink-900">{l.who}</b> {l.action}</p>
                  <p className="text-[12.5px] font-bold text-ink-900">{l.entity}</p>
                  <div className="mt-1.5 flex items-center gap-2"><Pill color={KIND_COLOR[l.kind]}>{l.kind}</Pill><span className="text-[11px] font-medium text-ink-400">{l.time}</span></div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      ))}
    </Shell>
  );
}
