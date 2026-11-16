import { CRITERIA, PROGRAMS, type Program } from "./data";

/** Skor multikriteria: S = Σ (wᵢ × xᵢ), bobot dinormalisasi agar total = 1, hasil 0–100. */
export function weightedScore(crit: number[], weights: number[]): number {
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  return crit.reduce((sum, x, i) => sum + (weights[i] / total) * x, 0);
}

export const DEFAULT_WEIGHTS = CRITERIA.map((c) => c.weight as number);

export function rankPrograms(weights: number[]) {
  return PROGRAMS.map((p) => ({ ...p, score: Math.round(weightedScore(p.crit, weights)) })).sort(
    (a, b) => b.score - a.score,
  );
}

export type ScoredProgram = Program & { score: number };

export interface ScenarioResult {
  selected: string[];
  totalCost: number;
  remaining: number;
  beneficiaries: number;
  totalScore: number;
  count: number;
}

export function evaluate(programs: ScoredProgram[], selected: string[], budget: number): ScenarioResult {
  const chosen = programs.filter((p) => selected.includes(p.id));
  const totalCost = chosen.reduce((a, p) => a + p.cost, 0);
  return {
    selected,
    totalCost,
    remaining: budget - totalCost,
    beneficiaries: chosen.reduce((a, p) => a + p.beneficiaries, 0),
    totalScore: chosen.reduce((a, p) => a + p.score, 0),
    count: chosen.length,
  };
}

/**
 * Optimasi berbatas anggaran (0/1 knapsack):
 * maksimalkan Σ (valueᵢ × xᵢ) dengan batasan Σ (costᵢ × xᵢ) ≤ B.
 */
export function optimize(programs: ScoredProgram[], budget: number, value: (p: ScoredProgram) => number): string[] {
  const B = Math.max(0, Math.floor(budget));
  const n = programs.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(B + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    const { cost } = programs[i - 1];
    const v = value(programs[i - 1]);
    for (let b = 0; b <= B; b++) {
      dp[i][b] = dp[i - 1][b];
      if (cost <= b && dp[i - 1][b - cost] + v > dp[i][b]) dp[i][b] = dp[i - 1][b - cost] + v;
    }
  }
  const picked: string[] = [];
  let b = B;
  for (let i = n; i >= 1; i--) {
    if (dp[i][b] !== dp[i - 1][b]) {
      picked.push(programs[i - 1].id);
      b -= programs[i - 1].cost;
    }
  }
  return picked.reverse();
}

export const rp = (juta: number) =>
  juta >= 1000 ? `Rp ${(juta / 1000).toFixed(2).replace(".", ",")} M` : `Rp ${juta.toLocaleString("id-ID")} jt`;
