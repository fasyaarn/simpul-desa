"use client";

import { useCallback, useEffect, useState } from "react";

/** State sederhana yang disimpan di localStorage (pengganti backend pada tahap prototipe). */
export function useLocal<T>(key: string, initial: T): [T, (v: T) => void, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* abaikan */
    }
    setReady(true);
  }, [key]);

  const set = useCallback(
    (v: T) => {
      setValue(v);
      try {
        window.localStorage.setItem(key, JSON.stringify(v));
      } catch {
        /* abaikan */
      }
    },
    [key],
  );

  return [value, set, ready];
}

export interface Draft {
  title: string;
  cat: string;
  desc: string;
  beneficiaries: string;
  group: string;
}

export const EMPTY_DRAFT: Draft = {
  title: "Perbaikan Saluran Drainase Dusun 2",
  cat: "infrastruktur",
  desc: "Saluran air tersumbat dan meluap ke jalan saat hujan, sehingga genangan masuk ke sekitar 40 rumah warga.",
  beneficiaries: "40 KK (± 160 jiwa)",
  group: "Petani, lansia, anak sekolah",
};

export interface SimState {
  budget: number;
  selected: string[];
}

export interface Chosen {
  label: string;
  ids: string[];
  budget: number;
}
