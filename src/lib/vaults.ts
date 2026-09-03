/**
 * Vault catalogue.
 *
 * Vault ids and names are business data: they are NOT translated. Everything
 * describing a vault in prose (category label, "updated" wording) is keyed so
 * the UI layer can localise it.
 */

export type VaultId =
  | "comptabilite-2026"
  | "lin-ventes-2026"
  | "prescription-nature";

export type VaultCategoryKey = "finance" | "sales" | "company";

export type VaultUpdated =
  | { kind: "today" }
  | { kind: "yesterday" }
  | { kind: "daysAgo"; days: number };

export type Vault = {
  id: VaultId;
  name: string;
  categoryKey: VaultCategoryKey;
  documentCount: number;
  updated: VaultUpdated;
  color: string;
};

export const vaults: Vault[] = [
  {
    id: "comptabilite-2026",
    name: "Comptabilité 2026",
    categoryKey: "finance",
    documentCount: 49920,
    updated: { kind: "today" },
    color: "bg-blue-50 text-blue-700",
  },
  {
    id: "lin-ventes-2026",
    name: "LIN — Ventes 2026",
    categoryKey: "sales",
    documentCount: 12480,
    updated: { kind: "yesterday" },
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "prescription-nature",
    name: "Prescription Nature",
    categoryKey: "company",
    documentCount: 8230,
    updated: { kind: "daysAgo", days: 3 },
    color: "bg-violet-50 text-violet-700",
  },
];

export const vaultNames: Record<string, string> = Object.fromEntries(
  vaults.map((vault) => [vault.id, vault.name]),
);

/** Vault names are data, so the fallback is the caller's localised label. */
export function getVaultName(vaultId: string, fallback: string): string {
  return vaultNames[vaultId] ?? fallback;
}
