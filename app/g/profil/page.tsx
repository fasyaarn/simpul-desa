import Link from "next/link";
import { Activity, ChevronRight, Gavel, Handshake, History, LogOut, Map as MapIcon, SlidersHorizontal, Users } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Avatar, Card, PageHeader } from "@/components/ui";

const MENU = [
  { icon: SlidersHorizontal, label: "Bobot kriteria", href: "/g/bobot" },
  { icon: MapIcon, label: "Peta & analisis spasial", href: "/g/peta" },
  { icon: Handshake, label: "Koordinasi lintas desa", href: "/g/koordinasi" },
  { icon: Gavel, label: "Dokumentasi keputusan", href: "/g/keputusan" },
  { icon: Activity, label: "Monitoring pelaksanaan", href: "/g/monitoring" },
  { icon: History, label: "Log aktivitas", href: "/g/log" },
  { icon: Users, label: "Kelola akun admin", href: "/g/profil" },
];

export default function ProfilPemerintah() {
  return (
    <Shell nav={{ role: "g", active: 4 }}>
      <PageHeader title="Profil" />
      <div className="mt-6 flex flex-col items-center">
        <Avatar initials="PA" size={84} />
        <p className="mt-3 text-lg font-extrabold text-ink-900">Pak Anwar</p>
        <p className="text-xs font-medium text-ink-600">Sekretaris Desa · Admin Desa Sukamaju</p>
      </div>
      <Card className="mt-6 divide-y divide-ink-200 !p-0">
        {MENU.map((m) => (
          <Link key={m.label} href={m.href} className="flex items-center gap-3 px-4 py-3.5">
            <m.icon size={19} className="text-green-700" />
            <span className="flex-1 text-sm font-semibold text-ink-900">{m.label}</span>
            <ChevronRight size={16} className="text-ink-400" />
          </Link>
        ))}
      </Card>
      <Link href="/" className="mt-5 flex items-center justify-center gap-2 rounded-full border-[1.5px] border-accent-red py-3.5 text-sm font-bold text-accent-red"><LogOut size={17} /> Keluar</Link>
    </Shell>
  );
}
