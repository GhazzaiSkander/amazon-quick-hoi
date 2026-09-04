import type { VaultAccess, VaultId, VaultOverviewMetrics } from "@/types";

/**
 * Vaults.
 *
 * The catalogue itself lives in `src/lib/vaults.ts` and stays the single source
 * of truth. It is re-exported here so every fixture has one entry point, and
 * this module only adds the mock state the catalogue does not carry.
 */
export { getVaultName, isVaultId, vaultNames, vaults } from "@/lib/vaults";

/** The signed-in user can read every demo vault. */
export const vaultAccess = {
  "comptabilite-2026": "granted",
  "lin-ventes-2026": "granted",
  "prescription-nature": "granted",
} satisfies Record<VaultId, VaultAccess>;

/**
 * Counters on the vault hub. Aggregates over the whole vault, which is why they
 * are far larger than the handful of rows the other fixtures hold.
 */
export const vaultOverviewMetrics = {
  pages: 49920,
  structuredData: 12480,
  sources: 248,
  toReview: 12,
} satisfies VaultOverviewMetrics;
