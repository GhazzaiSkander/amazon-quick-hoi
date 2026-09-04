"use client";

import type { ChangeEvent } from "react";
import { vaults, type VaultId } from "@/lib/vaults";

type VaultSelectorProps = {
  /**
   * Active vault, or null when the caller has no vault in scope yet (e.g. a
   * `?vaultId=` query param that is absent or unknown).
   */
  value: VaultId | null;
  label: string;
  /** Distinguishes the label/select pair when a page renders several. */
  id?: string;
  onChange: (vaultId: VaultId) => void;
};

export default function VaultSelector({
  value,
  label,
  id = "vault-selector",
  onChange,
}: VaultSelectorProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value as VaultId);
  }

  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="text-xs font-medium text-hoi-muted">
        {label}
      </label>

      <select
        id={id}
        value={value ?? ""}
        onChange={handleChange}
        className="rounded-lg border border-hoi-border bg-white px-3 py-2 text-sm font-medium text-hoi-navy outline-none transition-colors focus:border-hoi-navy"
      >
        {vaults.map((vault) => (
          <option key={vault.id} value={vault.id}>
            {vault.name}
          </option>
        ))}
      </select>
    </div>
  );
}
