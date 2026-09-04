/**
 * Vault types.
 *
 * The vault catalogue itself lives in `src/lib/vaults.ts` and stays the single
 * source of truth; this module re-exports its types so every screen can import
 * the whole domain vocabulary from `@/types`.
 */
export type {
  Vault,
  VaultCategoryKey,
  VaultId,
  VaultUpdated,
} from "@/lib/vaults";

/** What the signed-in user is allowed to do with a vault. */
export type VaultAccess = "granted" | "pending" | "denied";

/** Counters shown on the vault hub. Aggregates, not rows. */
export type VaultOverviewMetrics = {
  pages: number;
  structuredData: number;
  sources: number;
  toReview: number;
};
