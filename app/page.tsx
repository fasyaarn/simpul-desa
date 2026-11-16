import { NodeIcon } from "@/components/icons";
import { Shell } from "@/components/Shell";
import { ArrowRight } from "lucide-react";

export default function Welcome() {
  return (
    <Shell flush background="linear-gradient(170deg,#0F5B3F 0%,#14704E 55%,#1B8A5F 100%)" className="flex flex-col text-white">
      <div className="relative flex flex-1 flex-col px-7 pb-10 pt-16">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -left-16 top-64 h-48 w-48 rounded-full bg-white/5" />
        <span className="grid h-16 w-16 place-items-center rounded-[22px] bg-white text-green-800 shadow-card">
          <NodeIcon size={34} />
        </span>
        <p className="mt-10 text-sm font-semibold tracking-[0.2em] text-green-100">SIMPUL DESA</p>
        <h1 className="mt-3 text-[34px] font-extrabold leading-[1.15]">
          Suara warga,
          <br />
          dasar keputusan desa.
        </h1>
        <p className="mt-4 max-w-[310px] text-[14.5px] font-medium leading-6 text-green-100">
          Ajukan kebutuhan, pantau prosesnya, dan bantu pemerintah desa menentukan prioritas pembangunan yang transparan dan berbasis data.
        </p>
        <div className="mt-auto space-y-3 pt-10">
          <a href="/login" className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-[15px] font-bold text-green-800 shadow-card">
            Masuk <ArrowRight size={18} strokeWidth={2.4} />
          </a>
          <a href="/daftar" className="flex w-full items-center justify-center rounded-full border-[1.5px] border-white/60 py-4 text-[15px] font-bold text-white">
            Daftar sebagai Warga
          </a>
          <p className="pt-2 text-center text-[11px] font-medium text-green-100/80">Prototipe · data pada aplikasi ini adalah data contoh</p>
        </div>
      </div>
    </Shell>
  );
}
