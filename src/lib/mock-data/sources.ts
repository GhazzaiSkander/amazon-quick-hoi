import type { Source, SourceMetrics } from "@/types";

/**
 * Files imported into the demo vault.
 *
 * Filenames, sizes and dates are business data and stay verbatim; `category`
 * and `status` are keys resolved by the screens. `process_onboarding.pdf` is
 * deliberately left in `toValidate`: a source waiting for a review is never
 * promoted to `validated` on its own.
 */
export const sources = [
  {
    id: "account-move-2026",
    vaultId: "comptabilite-2026",
    name: "account_move_2026.csv",
    type: "file",
    format: "CSV",
    category: "finance",
    status: "imported",
    sizeBytes: 202 * 1024 * 1024,
    addedByUserId: "skander",
    createdAt: "2026-09-03",
    updatedAt: null,
  },
  {
    id: "account-move-reference",
    vaultId: "comptabilite-2026",
    name: "account_move_reference.xlsx",
    type: "file",
    format: "Excel",
    category: "reference",
    status: "validated",
    sizeBytes: 14 * 1024 * 1024,
    addedByUserId: "sabri",
    createdAt: "2026-09-01",
    updatedAt: null,
  },
  {
    id: "process-onboarding",
    vaultId: "comptabilite-2026",
    name: "process_onboarding.pdf",
    type: "file",
    format: "PDF",
    category: "process",
    status: "toValidate",
    sizeBytes: Math.round(2.4 * 1024 * 1024),
    addedByUserId: "camille",
    createdAt: "2026-08-30",
    updatedAt: null,
  },
] satisfies Source[];

export function findSource(sourceId: string): Source | null {
  return sources.find((source) => source.id === sourceId) ?? null;
}

/** Filenames are business data, so the fallback is the raw id, never a label. */
export function getSourceName(sourceId: string): string {
  return findSource(sourceId)?.name ?? sourceId;
}

/** Counters above the source list: aggregates over the vault, not over `sources`. */
export const sourceMetrics = {
  total: 248,
  validated: 236,
  pending: 12,
} satisfies SourceMetrics;
