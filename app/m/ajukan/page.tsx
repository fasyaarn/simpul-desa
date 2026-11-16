"use client";

import { useRouter } from "next/navigation";
import { Shell } from "@/components/Shell";
import { Button, Chip, Field, PageHeader, Stepper } from "@/components/ui";
import { CAT_LABEL, type CatKey } from "@/lib/data";
import { EMPTY_DRAFT, useLocal, type Draft } from "@/lib/store";
import { ArrowRight } from "lucide-react";

export default function Ajukan() {
  const router = useRouter();
  const [d, setD, ready] = useLocal<Draft>("simpul.draft", EMPTY_DRAFT);
  const set = (k: keyof Draft) => (v: string) => setD({ ...d, [k]: v });
  return (
    <Shell
      nav={{ role: "m", active: 2 }}
      footer={
        <Button icon={ArrowRight} disabled={!ready || !d.title.trim()} onClick={() => router.push("/m/ajukan/lokasi")}>
          Lanjut: Lokasi &amp; Bukti
        </Button>
      }
    >
      <PageHeader title="Ajukan Kebutuhan" />
      <div className="mt-3"><Stepper step={1} title="Detail kebutuhan" /></div>
      <div className="mt-5 space-y-4">
        <Field label="Judul usulan" value={d.title} onChange={set("title")} placeholder="Contoh: Perbaikan jalan dusun" />
        <div>
          <span className="mb-2 block text-xs font-semibold text-ink-600">Kategori</span>
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5">
            {(Object.keys(CAT_LABEL) as CatKey[]).map((c) => (
              <Chip key={c} on={d.cat === c} onClick={() => set("cat")(c)}>{CAT_LABEL[c]}</Chip>
            ))}
          </div>
        </div>
        <Field label="Deskripsi masalah" value={d.desc} onChange={set("desc")} multiline rows={4} placeholder="Jelaskan kondisi dan dampaknya" />
        <Field label="Perkiraan penerima manfaat" value={d.beneficiaries} onChange={set("beneficiaries")} />
        <Field label="Kelompok terdampak" value={d.group} onChange={set("group")} />
      </div>
    </Shell>
  );
}
