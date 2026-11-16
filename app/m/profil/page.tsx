import { Bell, ChevronRight, HelpCircle, LogOut, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { Shell } from "@/components/Shell";
import { Avatar, Card, PageHeader } from "@/components/ui";

const MENU = [
  { icon: User, label: "Data diri" },
  { icon: Bell, label: "Notifikasi" },
  { icon: ShieldCheck, label: "Privasi & keamanan" },
  { icon: HelpCircle, label: "Bantuan" },
];

export default function ProfilMasyarakat() {
  return (
    <Shell nav={{ role: "m", active: 4 }}>
      <PageHeader title="Profil" />
      <div className="mt-6 flex flex-col items-center">
        <Avatar initials="BS" size={84} />
        <p className="mt-3 text-lg font-extrabold text-ink-900">Budi Santoso</p>
        <p className="text-xs font-medium text-ink-600">Warga · Dusun 2, Desa Sukamaju</p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        {[["5", "Usulan"], ["1", "Terverifikasi"], ["1", "Perlu revisi"]].map(([v, l]) => (
          <Card key={l} tone="mint" className="!p-3">
            <p className="text-xl font-extrabold text-green-800">{v}</p>
            <p className="text-[11px] font-medium text-ink-600">{l}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-5 divide-y divide-ink-200 !p-0">
        {MENU.map((m) => (
          <div key={m.label} className="flex items-center gap-3 px-4 py-3.5">
            <m.icon size={19} className="text-green-700" />
            <span className="flex-1 text-sm font-semibold text-ink-900">{m.label}</span>
            <ChevronRight size={16} className="text-ink-400" />
          </div>
        ))}
      </Card>
      <Link href="/" className="mt-5 flex items-center justify-center gap-2 rounded-full border-[1.5px] border-accent-red py-3.5 text-sm font-bold text-accent-red">
        <LogOut size={17} /> Keluar
      </Link>
    </Shell>
  );
}
