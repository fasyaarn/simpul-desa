"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Lock, Mail } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button, Field, PageHeader, Seg } from "@/components/ui";
import { NodeIcon } from "@/components/icons";

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState(0);
  const [email, setEmail] = useState("budi.santoso@contoh.id");
  const [pass, setPass] = useState("password");

  const pick = (i: number) => {
    setRole(i);
    setEmail(i === 0 ? "budi.santoso@contoh.id" : "anwar@desasukamaju.id");
  };

  return (
    <Shell footer={<Button onClick={() => router.push(role === 0 ? "/m/beranda" : "/g/beranda")}>Masuk</Button>}>
      <PageHeader title="Masuk" back="/" />
      <div className="mt-4 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-green-50 text-green-700">
          <NodeIcon size={26} />
        </span>
        <div>
          <p className="text-lg font-extrabold text-ink-900">Selamat datang kembali</p>
          <p className="text-xs font-medium text-ink-600">Desa Sukamaju, Kec. Cimenyan</p>
        </div>
      </div>
      <div className="mt-6">
        <Seg items={["Masyarakat", "Pemerintah Desa"]} active={role} onChange={pick} />
      </div>
      <div className="mt-5 space-y-4">
        <Field label="Email" value={email} onChange={setEmail} icon={Mail} />
        <Field label="Kata sandi" value={pass} onChange={setPass} icon={Eye} type="password" />
        <p className="text-right text-xs font-semibold text-green-700">Lupa kata sandi?</p>
      </div>
      <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-green-100 bg-green-50 p-3.5">
        <Lock size={16} className="mt-0.5 shrink-0 text-green-700" />
        <p className="text-[11.5px] font-medium leading-[17px] text-ink-600">
          Akses dibatasi sesuai peran (RBAC). Warga hanya melihat usulannya sendiri; admin desa dapat memverifikasi, menganalisis, dan mencatat keputusan.
        </p>
      </div>
      <p className="mt-5 text-center text-[13px] font-medium text-ink-600">
        Belum punya akun? <a href="/daftar" className="font-bold text-green-700">Daftar</a>
      </p>
    </Shell>
  );
}
