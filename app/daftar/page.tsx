"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, User } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button, Checkbox, Field, PageHeader } from "@/components/ui";

export default function Daftar() {
  const router = useRouter();
  const [agree, setAgree] = useState(true);
  return (
    <Shell footer={<Button disabled={!agree} onClick={() => router.push("/m/beranda")}>Buat Akun</Button>}>
      <PageHeader title="Daftar Warga" back="/" />
      <p className="mt-2 text-[13px] font-medium leading-5 text-ink-600">Akun warga dipakai untuk mengajukan usulan dan memantau statusnya. Akun pemerintah desa dibuat oleh admin.</p>
      <div className="mt-5 space-y-4">
        <Field label="Nama lengkap" value="Budi Santoso" icon={User} />
        <Field label="Email" value="budi.santoso@contoh.id" icon={Mail} />
        <Field label="No. telepon" value="0812-3456-7890" icon={Phone} />
        <Field label="Dusun / RT" value="Dusun 2 / RT 03" />
        <Field label="Kata sandi" value="password" type="password" />
      </div>
      <div className="mt-5">
        <Checkbox checked={agree} onChange={setAgree}>
          Saya menyetujui bahwa data usulan dan lokasi yang saya kirim dapat diproses oleh pemerintah desa untuk perencanaan pembangunan.
        </Checkbox>
      </div>
    </Shell>
  );
}
