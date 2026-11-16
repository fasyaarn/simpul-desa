// Data dummy SIMPUL DESA (prototipe). Semua angka fiktif untuk keperluan desain & uji alur.

export type CatKey = "infrastruktur" | "air" | "pendidikan" | "kesehatan" | "ekonomi" | "pertanian" | "lainnya";
export type NeedStatus = "SUBMITTED" | "UNDER_REVIEW" | "NEEDS_REVISION" | "VERIFIED" | "REJECTED";
export type ProgStatus = "PLANNED" | "APPROVED" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD";

export const CAT_LABEL: Record<CatKey, string> = {
  infrastruktur: "Infrastruktur",
  air: "Air Bersih",
  pendidikan: "Pendidikan",
  kesehatan: "Kesehatan",
  ekonomi: "Ekonomi",
  pertanian: "Pertanian",
  lainnya: "Lainnya",
};

export const CAT_COLOR: Record<CatKey, string> = {
  infrastruktur: "#F59E42",
  air: "#14B8A6",
  pendidikan: "#8B5CF6",
  kesehatan: "#EF6A8B",
  ekonomi: "#4C7DF0",
  pertanian: "#7CB342",
  lainnya: "#F5B83D",
};

export const STATUS_LABEL: Record<NeedStatus, string> = {
  SUBMITTED: "Diajukan",
  UNDER_REVIEW: "Ditinjau",
  NEEDS_REVISION: "Perlu Revisi",
  VERIFIED: "Terverifikasi",
  REJECTED: "Ditolak",
};

export const STATUS_COLOR: Record<NeedStatus, string> = {
  SUBMITTED: "#4C7DF0",
  UNDER_REVIEW: "#F59E42",
  NEEDS_REVISION: "#E5484D",
  VERIFIED: "#1B8A5F",
  REJECTED: "#5F6F68",
};

export const PROG_LABEL: Record<ProgStatus, string> = {
  PLANNED: "Direncanakan",
  APPROVED: "Disetujui",
  IN_PROGRESS: "Berjalan",
  COMPLETED: "Selesai",
  ON_HOLD: "Ditunda",
};

export const PROG_COLOR: Record<ProgStatus, string> = {
  PLANNED: "#97A59F",
  APPROVED: "#4C7DF0",
  IN_PROGRESS: "#1B8A5F",
  COMPLETED: "#14704E",
  ON_HOLD: "#F59E42",
};

export interface Need {
  id: string;
  title: string;
  cat: CatKey;
  desc: string;
  when: string;
  whenShort: string;
  status: NeedStatus;
  beneficiaries: number;
  group: string;
  coords: string;
  x: number; // posisi relatif pada peta ilustrasi (0..1)
  y: number;
  by: string;
  dusun: string;
  mine?: boolean;
  note?: string;
  dupOf?: string;
  dupDistance?: string;
  photos: number;
}

export const NEEDS: Need[] = [
  { id: "USL-0149", title: "Perbaikan Saluran Drainase Dusun 2", cat: "infrastruktur", desc: "Saluran air tersumbat dan meluap ke jalan saat hujan, sehingga genangan masuk ke sekitar 40 rumah warga.", when: "16 Nov 2026, 14:32", whenShort: "Hari ini, 14:32", status: "SUBMITTED", beneficiaries: 160, group: "Petani, lansia, anak sekolah", coords: "-6.9175, 107.6191", x: 0.46, y: 0.4, by: "Budi Santoso", dusun: "Dusun 2", mine: true, photos: 2 },
  { id: "USL-0148", title: "Perbaikan Jalan Dusun 2", cat: "infrastruktur", desc: "Jalan utama dusun berlubang dan berlumpur saat hujan; menyulitkan angkutan hasil tani dan akses sekolah.", when: "16 Nov 2026, 10:24", whenShort: "Hari ini, 10:24", status: "SUBMITTED", beneficiaries: 620, group: "Petani, pelajar", coords: "-6.9181, 107.6197", x: 0.5, y: 0.36, by: "Sutrisno", dusun: "Dusun 2", dupOf: "USL-0112", dupDistance: "± 80 m", photos: 3 },
  { id: "USL-0147", title: "Sumur Bor & Air Bersih RT 04", cat: "air", desc: "Warga RT 04 masih mengambil air dari sumber berjarak ±1,8 km. Dibutuhkan sumur bor dan jaringan pipa.", when: "15 Nov 2026, 09:40", whenShort: "Kemarin, 09:40", status: "UNDER_REVIEW", beneficiaries: 310, group: "Ibu rumah tangga, lansia", coords: "-6.9210, 107.6150", x: 0.22, y: 0.7, by: "Budi Santoso", dusun: "RT 04", mine: true, photos: 2 },
  { id: "USL-0145", title: "Renovasi PAUD Melati", cat: "pendidikan", desc: "Atap bocor dan lantai retak pada ruang belajar PAUD; 2 dari 3 ruang tidak layak dipakai saat hujan.", when: "15 Nov 2026, 15:12", whenShort: "Kemarin, 15:12", status: "VERIFIED", beneficiaries: 85, group: "Anak usia dini", coords: "-6.9160, 107.6215", x: 0.7, y: 0.28, by: "Budi Santoso", dusun: "Dusun 1", mine: true, photos: 3 },
  { id: "USL-0143", title: "Posyandu Terpadu Dusun 1", cat: "kesehatan", desc: "Posyandu menumpang di rumah warga dan tidak memiliki ruang penimbangan memadai.", when: "15 Nov 2026, 11:30", whenShort: "Kemarin, 11:30", status: "NEEDS_REVISION", beneficiaries: 240, group: "Balita, ibu hamil", coords: "-6.9150, 107.6180", x: 0.38, y: 0.22, by: "Budi Santoso", dusun: "Dusun 1", mine: true, note: "Mohon tambahkan foto kondisi bangunan saat ini dan jumlah balita yang terlayani per bulan.", photos: 1 },
  { id: "USL-0141", title: "Penerangan Jalan Dusun 3", cat: "infrastruktur", desc: "Ruas jalan sepanjang 1,2 km tidak memiliki lampu; rawan kecelakaan pada malam hari.", when: "15 Nov 2026, 08:05", whenShort: "Kemarin, 08:05", status: "VERIFIED", beneficiaries: 410, group: "Warga Dusun 3", coords: "-6.9230, 107.6240", x: 0.78, y: 0.66, by: "Wahyu", dusun: "Dusun 3", photos: 2 },
  { id: "USL-0138", title: "Revitalisasi Pasar Desa", cat: "ekonomi", desc: "Los pasar rusak dan sempit; pedagang kecil berjualan di bahu jalan.", when: "12 Nov 2026, 14:20", whenShort: "12 Nov, 14:20", status: "UNDER_REVIEW", beneficiaries: 900, group: "Pedagang, pembeli", coords: "-6.9190, 107.6205", x: 0.6, y: 0.5, by: "Budi Santoso", dusun: "Dusun 1", mine: true, photos: 2 },
  { id: "USL-0136", title: "Jembatan Dusun 5", cat: "infrastruktur", desc: "Usulan pembangunan jembatan penghubung antar dusun.", when: "12 Nov 2026, 10:02", whenShort: "12 Nov, 10:02", status: "REJECTED", beneficiaries: 380, group: "Warga Dusun 5", coords: "-6.9250, 107.6120", x: 0.12, y: 0.82, by: "Ratna", dusun: "Dusun 5", note: "Di luar kewenangan desa; kewenangan jalan penghubung ada pada pemerintah kabupaten.", photos: 1 },
  { id: "USL-0134", title: "Embung Desa Tahap II", cat: "air", desc: "Lanjutan pembangunan embung untuk cadangan air irigasi musim kemarau.", when: "11 Nov 2026, 16:45", whenShort: "11 Nov, 16:45", status: "VERIFIED", beneficiaries: 520, group: "Petani", coords: "-6.9140, 107.6260", x: 0.86, y: 0.2, by: "Kelompok Tani Makmur", dusun: "Dusun 4", photos: 3 },
  { id: "USL-0131", title: "Pelatihan UMKM Kelompok Tani", cat: "ekonomi", desc: "Pelatihan pengolahan dan pemasaran hasil tani untuk 3 kelompok tani.", when: "11 Nov 2026, 09:10", whenShort: "11 Nov, 09:10", status: "UNDER_REVIEW", beneficiaries: 120, group: "Petani, ibu PKK", coords: "-6.9170, 107.6230", x: 0.66, y: 0.42, by: "Ibu Lestari", dusun: "Dusun 3", photos: 0 },
  { id: "USL-0112", title: "Perbaikan Jalan Utama Dusun 2", cat: "infrastruktur", desc: "Perbaikan ruas jalan utama dusun (usulan lebih lama).", when: "2 Okt 2026, 13:00", whenShort: "2 Okt, 13:00", status: "VERIFIED", beneficiaries: 560, group: "Warga Dusun 2", coords: "-6.9180, 107.6190", x: 0.48, y: 0.38, by: "Hendra", dusun: "Dusun 2", photos: 2 },
];

export const MY_NEEDS = NEEDS.filter((n) => n.mine);
export const getNeed = (id: string) => NEEDS.find((n) => n.id === id);

// ---------- Kriteria & program (penilaian multikriteria + simulator) ----------

export const CRITERIA = [
  { key: "urgensi", name: "Urgensi", desc: "Tingkat kedaruratan masalah", weight: 25 },
  { key: "penerima", name: "Jumlah Penerima Manfaat", desc: "Cakupan warga yang terlayani", weight: 20 },
  { key: "dampak", name: "Dampak Sosial-Ekonomi", desc: "Pengaruh pada kesejahteraan warga", weight: 20 },
  { key: "pemerataan", name: "Pemerataan", desc: "Menjangkau wilayah/kelompok tertinggal", weight: 15 },
  { key: "kondisi", name: "Kondisi Fasilitas", desc: "Tingkat kerusakan / kekurangan fasilitas", weight: 10 },
  { key: "kelayakan", name: "Kelayakan", desc: "Kesiapan teknis dan kewenangan desa", weight: 10 },
] as const;

export interface Program {
  id: string;
  name: string;
  cat: CatKey;
  cost: number; // juta rupiah
  beneficiaries: number; // jiwa
  crit: number[]; // 0..100 sesuai urutan CRITERIA
  needId?: string;
  shared?: boolean; // pengadaan bersama lintas desa (biaya = porsi desa ini)
}

export const PROGRAMS: Program[] = [
  { id: "P01", name: "Perbaikan Jalan Dusun 2", cat: "infrastruktur", cost: 185, beneficiaries: 620, crit: [95, 90, 92, 85, 95, 92], needId: "USL-0148" },
  { id: "P02", name: "Sumur Bor & Air Bersih RT 04", cat: "air", cost: 120, beneficiaries: 310, crit: [98, 78, 90, 90, 88, 85], needId: "USL-0147" },
  { id: "P03", name: "Renovasi PAUD Melati", cat: "pendidikan", cost: 95, beneficiaries: 85, crit: [85, 55, 88, 85, 85, 92], needId: "USL-0145" },
  { id: "P04", name: "Posyandu Terpadu Dusun 1", cat: "kesehatan", cost: 70, beneficiaries: 240, crit: [82, 65, 80, 75, 78, 80], needId: "USL-0143" },
  { id: "P05", name: "Penerangan Jalan Dusun 3", cat: "infrastruktur", cost: 55, beneficiaries: 410, crit: [70, 75, 62, 70, 65, 80], needId: "USL-0141" },
  { id: "P06", name: "Revitalisasi Pasar Desa", cat: "ekonomi", cost: 210, beneficiaries: 900, crit: [60, 90, 70, 55, 60, 50], needId: "USL-0138" },
  { id: "P07", name: "Embung Desa Tahap II", cat: "air", cost: 160, beneficiaries: 520, crit: [72, 80, 75, 65, 68, 70], needId: "USL-0134" },
  { id: "P08", name: "Drainase Dusun 2", cat: "infrastruktur", cost: 90, beneficiaries: 160, crit: [68, 45, 65, 70, 60, 75], needId: "USL-0149" },
  { id: "P09", name: "Pelatihan UMKM Kelompok Tani", cat: "ekonomi", cost: 45, beneficiaries: 120, crit: [55, 40, 62, 60, 50, 70], needId: "USL-0131" },
  { id: "P10", name: "Jembatan Penghubung Dusun 5", cat: "infrastruktur", cost: 240, beneficiaries: 380, crit: [62, 70, 66, 58, 55, 45] },
  { id: "P11", name: "Traktor Bersama (patungan 3 desa)", cat: "pertanian", cost: 62, beneficiaries: 360, crit: [74, 85, 82, 80, 70, 78], shared: true },
  { id: "P12", name: "Pengering Hasil Tani Bersama", cat: "pertanian", cost: 70, beneficiaries: 240, crit: [66, 70, 72, 68, 60, 74], shared: true },
];

// ---------- Koordinasi lintas desa ----------

export const VILLAGES = [
  { id: "sukamaju", name: "Sukamaju", home: true },
  { id: "mekarsari", name: "Mekarsari", home: false },
  { id: "cibeureum", name: "Cibeureum", home: false },
] as const;

export interface SharedOpp {
  id: string;
  title: string;
  item: string;
  cat: CatKey;
  desc: string;
  unitCost: number; // juta rupiah per unit
  opexYear: number; // biaya operasional bersama per tahun (juta)
  maxDistanceKm: number;
  route: "desa" | "kabupaten"; // jalur koordinasi yang disarankan
  programId?: string;
  villages: { name: string; farmers: number; slot: string }[];
  note: string;
}

export const SHARED_OPPS: SharedOpp[] = [
  {
    id: "K1",
    title: "Traktor roda empat bersama",
    item: "Traktor",
    cat: "pertanian",
    desc: "Tiga desa sama-sama mengusulkan alat pengolah lahan. Satu unit dipakai bergantian sesuai jadwal tanam.",
    unitCost: 185,
    opexYear: 12,
    maxDistanceKm: 4.2,
    route: "desa",
    programId: "P11",
    villages: [
      { name: "Sukamaju", farmers: 150, slot: "Minggu 1–2" },
      { name: "Mekarsari", farmers: 120, slot: "Minggu 3–4" },
      { name: "Cibeureum", farmers: 90, slot: "Minggu 5–6" },
    ],
    note: "Disarankan dikelola BUMDes gabungan dengan operator tetap dan dana perawatan bersama.",
  },
  {
    id: "K2",
    title: "Pengering hasil pertanian bersama",
    item: "Fasilitas pengering",
    cat: "pertanian",
    desc: "Dua desa berdekatan membutuhkan pengering gabah/jagung. Satu fasilitas di lokasi tengah dapat melayani keduanya.",
    unitCost: 140,
    opexYear: 8,
    maxDistanceKm: 2.6,
    route: "desa",
    programId: "P12",
    villages: [
      { name: "Sukamaju", farmers: 150, slot: "Senin–Rabu" },
      { name: "Mekarsari", farmers: 120, slot: "Kamis–Sabtu" },
    ],
    note: "Lokasi ideal di perbatasan kedua desa agar jarak angkut petani seimbang.",
  },
  {
    id: "K3",
    title: "Jaringan irigasi sekunder",
    item: "Irigasi",
    cat: "air",
    desc: "Kebutuhan melintasi tiga desa dan biayanya melampaui kapasitas Dana Desa; lebih tepat lewat program sektoral.",
    unitCost: 480,
    opexYear: 20,
    maxDistanceKm: 6.8,
    route: "kabupaten",
    villages: [
      { name: "Sukamaju", farmers: 150, slot: "-" },
      { name: "Mekarsari", farmers: 120, slot: "-" },
      { name: "Cibeureum", farmers: 90, slot: "-" },
    ],
    note: "Diusulkan ke Dinas PU/Pertanian kabupaten dan dibahas pada musrenbang kecamatan.",
  },
];

export const DEFAULT_BUDGET = 500; // juta rupiah (alokasi pembangunan 2027 yang dapat disimulasikan)
export const DANA_DESA_TOTAL = 850; // juta rupiah

// ---------- Monitoring pelaksanaan ----------

export interface MonitorItem {
  id: string;
  name: string;
  cat: CatKey;
  status: ProgStatus;
  progress: number;
  area: string;
  budget: number;
  updated: string;
  lastNote: string;
  issue?: string;
}

export const MONITOR: MonitorItem[] = [
  { id: "M01", name: "Perbaikan Jalan Dusun 2", cat: "infrastruktur", status: "IN_PROGRESS", progress: 75, area: "Dusun 2", budget: 185, updated: "14 Nov 2026", lastNote: "Pengerasan jalan tahap 2 selesai 1,1 km dari 1,5 km.", issue: "Hujan deras menunda pengecoran 2 hari." },
  { id: "M02", name: "Sumur Bor & Air Bersih RT 04", cat: "air", status: "IN_PROGRESS", progress: 40, area: "RT 04", budget: 120, updated: "13 Nov 2026", lastNote: "Pengeboran mencapai kedalaman 60 m, menunggu uji debit." },
  { id: "M03", name: "Renovasi PAUD Melati", cat: "pendidikan", status: "COMPLETED", progress: 100, area: "Dusun 1", budget: 95, updated: "5 Nov 2026", lastNote: "Serah terima pekerjaan dan dokumentasi akhir telah diunggah." },
  { id: "M04", name: "Posyandu Terpadu Dusun 1", cat: "kesehatan", status: "ON_HOLD", progress: 20, area: "Dusun 1", budget: 70, updated: "9 Nov 2026", lastNote: "Pekerjaan ditunda menunggu kepastian lahan.", issue: "Status lahan belum disepakati pemilik." },
  { id: "M05", name: "Embung Desa Tahap II", cat: "air", status: "APPROVED", progress: 5, area: "Dusun 4", budget: 160, updated: "10 Nov 2026", lastNote: "Persiapan lahan dan mobilisasi alat." },
];

// ---------- Log aktivitas (audit) ----------

export interface LogItem {
  who: string;
  initials: string;
  action: string;
  entity: string;
  time: string;
  group: string;
  kind: "Verifikasi" | "Keputusan" | "Simulasi" | "Akun";
}

export const LOGS: LogItem[] = [
  { who: "Bu Sari Wulandari", initials: "SW", action: "memverifikasi usulan", entity: "USL-0145 · Renovasi PAUD Melati", time: "14:05", group: "Hari Ini", kind: "Verifikasi" },
  { who: "Bu Sari Wulandari", initials: "SW", action: "meminta revisi usulan", entity: "USL-0143 · Posyandu Terpadu", time: "11:40", group: "Hari Ini", kind: "Verifikasi" },
  { who: "Pak Anwar", initials: "PA", action: "menyimpan skenario", entity: "Skenario A · anggaran Rp 500 jt", time: "10:12", group: "Hari Ini", kind: "Simulasi" },
  { who: "Pak Anwar", initials: "PA", action: "mengubah bobot kriteria", entity: "Urgensi 20% → 25%", time: "09:30", group: "Hari Ini", kind: "Simulasi" },
  { who: "Bu Sari Wulandari", initials: "SW", action: "mencatat keputusan", entity: "Perbaikan Jalan Dusun 2 · Disetujui", time: "16:20", group: "Kemarin", kind: "Keputusan" },
  { who: "Bu Sari Wulandari", initials: "SW", action: "menolak usulan", entity: "USL-0136 · Jembatan Dusun 5", time: "13:02", group: "Kemarin", kind: "Verifikasi" },
  { who: "Admin Sistem", initials: "AS", action: "menambahkan akun admin desa", entity: "Pak Anwar · Sekretaris Desa", time: "08:45", group: "Kemarin", kind: "Akun" },
  { who: "Pak Anwar", initials: "PA", action: "memperbarui progres", entity: "Perbaikan Jalan Dusun 2 · 75%", time: "15:10", group: "14 Nov 2026", kind: "Keputusan" },
];

// ---------- Analitik ----------

export const MONTHLY = [
  { m: "Jun", v: 18 },
  { m: "Jul", v: 21 },
  { m: "Agu", v: 26 },
  { m: "Sep", v: 24 },
  { m: "Okt", v: 29 },
  { m: "Nov", v: 42 },
];

export const TOP_CATS: { cat: CatKey; label: string; count: number; pct: number }[] = [
  { cat: "infrastruktur", label: "Jalan & Infrastruktur", count: 51, pct: 32 },
  { cat: "air", label: "Air Bersih & Sanitasi", count: 32, pct: 20 },
  { cat: "pendidikan", label: "Pendidikan", count: 26, pct: 16 },
  { cat: "kesehatan", label: "Kesehatan", count: 22, pct: 14 },
  { cat: "ekonomi", label: "Ekonomi & UMKM", count: 16, pct: 10 },
];

// ---------- Peta ----------

export interface Facility {
  id: string;
  name: string;
  type: "sekolah" | "kesehatan" | "balai" | "air" | "pasar";
  x: number;
  y: number;
  condition: string;
}

export const FACILITIES: Facility[] = [
  { id: "F1", name: "SD Negeri 1 Sukamaju", type: "sekolah", x: 0.3, y: 0.3, condition: "Baik" },
  { id: "F2", name: "PAUD Melati", type: "sekolah", x: 0.7, y: 0.3, condition: "Rusak sedang" },
  { id: "F3", name: "Pustu Sukamaju", type: "kesehatan", x: 0.54, y: 0.62, condition: "Baik" },
  { id: "F4", name: "Balai Desa", type: "balai", x: 0.56, y: 0.45, condition: "Baik" },
  { id: "F5", name: "Sumber Air Dusun 1", type: "air", x: 0.8, y: 0.45, condition: "Terbatas" },
  { id: "F6", name: "Pasar Desa", type: "pasar", x: 0.6, y: 0.55, condition: "Rusak sedang" },
];

export interface ServiceGap {
  id: string;
  x: number;
  y: number;
  r: number;
  title: string;
  detail: string;
  cat: CatKey;
}

export const GAPS: ServiceGap[] = [
  { id: "G1", x: 0.22, y: 0.72, r: 0.13, title: "Air bersih RT 04", detail: "Sumber air terdekat ± 1,8 km (standar layanan 500 m)", cat: "air" },
  { id: "G2", x: 0.84, y: 0.7, r: 0.1, title: "Penerangan Dusun 3", detail: "Ruas jalan 1,2 km belum memiliki lampu", cat: "infrastruktur" },
];
