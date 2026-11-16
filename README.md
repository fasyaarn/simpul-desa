# SIMPUL DESA — Prototipe UI (Next.js + Tailwind)

Prototipe mobile-first sistem pendukung keputusan pembangunan desa, mengacu pada PRD & System Design SIMPUL DESA dan gaya visual referensi (hijau fintech).
Semua data adalah **data dummy**; state (draft usulan, bobot, simulasi, keputusan) disimpan di `localStorage`.

## Menjalankan
```bash
npm install
npm run dev      # http://localhost:3000
```
Buka di lebar layar ponsel (atau desktop: tampil sebagai bingkai ponsel).

## Halaman (27 rute)
- **Auth**: `/` Welcome, `/login` (pilih peran), `/daftar`
- **Masyarakat** (`/m/*`): beranda, usulan (daftar + detail/status/revisi), ajukan (2 langkah + sukses), desa (peta & pembangunan), profil
- **Pemerintah Desa** (`/g/*`): beranda, koordinasi lintas desa (+ detail, jadwal gantian), usulan (antrean verifikasi + tinjau: verifikasi/revisi/tolak, deteksi duplikat), peta & analisis spasial, analitik, prioritas (peringkat MCDA), bobot kriteria, simulasi anggaran, perbandingan skenario, dokumentasi keputusan, monitoring, log aktivitas, profil

## Logika (lib/logic.ts)
- Skor MCDA: S = Σ(wᵢ·xᵢ), bobot dinormalisasi, skala 0–100
- Optimasi anggaran: maksimalkan Σ sᵢxᵢ dengan Σ cᵢxᵢ ≤ B (0/1 knapsack)
- Hasil simulasi = rekomendasi, bukan keputusan final

## Catatan
Peta berupa SVG ilustratif; versi produksi memakai Leaflet + OpenStreetMap + PostgreSQL/PostGIS. Font Plus Jakarta Sans dimuat dari Google Fonts.
