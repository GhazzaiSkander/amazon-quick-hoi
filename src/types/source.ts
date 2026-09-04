import type { IsoDateString } from "./common";
import type { UserId } from "./user";
import type { VaultId } from "./vault";

/** How the source reaches the vault. */
export type SourceType = "file" | "folder" | "connector";

/** File format badge, displayed verbatim next to the source name. */
export type SourceFormat = "CSV" | "Excel" | "PDF";

/** Translated through `sources.categories.*`. */
export type SourceCategory = "finance" | "reference" | "process";

/**
 * Lifecycle of a source. `toValidate` is the pending state: a source waiting
 * for a human review is never promoted to `validated` on its own.
 *
 * The values double as `sources.statuses.*` message keys.
 */
export type SourceStatus = "imported" | "validated" | "toValidate";

export type Source = {
  id: string;
  vaultId: VaultId;
  /** Filename as stored. Business data: never translated. */
  name: string;
  type: SourceType;
  format: SourceFormat;
  category: SourceCategory;
  status: SourceStatus;
  sizeBytes: number;
  /** Provenance: who brought the file in. */
  addedByUserId: UserId;
  /** When the source was added to the vault. */
  createdAt: IsoDateString;
  /** Unknown in the prototype: the fixtures only record the import date. */
  updatedAt: IsoDateString | null;
};

/** Counters shown above the source list. Aggregates, not rows. */
export type SourceMetrics = {
  total: number;
  validated: number;
  pending: number;
};
