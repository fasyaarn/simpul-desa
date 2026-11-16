export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/** Tambahkan alpha (0–1) pada warna hex #RRGGBB. */
export const alpha = (hex: string, a: number) =>
  hex + Math.round(a * 255).toString(16).padStart(2, "0");
