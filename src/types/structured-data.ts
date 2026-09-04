import type { IsoDateString } from "./common";
import type { VaultId } from "./vault";

/** Kinds of structured rows extracted from a source. */
export type StructuredRecordType = "invoice";

/** Shared shape of every structured row, whatever its kind. */
export type StructuredRecord = {
  id: string;
  vaultId: VaultId;
  type: StructuredRecordType;
  /** Provenance: the file the row was extracted from. */
  sourceId: string;
};

/**
 * Payment status. `toVerify` is the pending state; a row awaiting a check is
 * never promoted on its own. The values double as `data.statuses.*` keys.
 */
export type InvoiceStatus = "paid" | "toVerify";

export type Invoice = StructuredRecord & {
  type: "invoice";
  /** Invoice number as printed on the document. Business data. */
  number: string;
  issuedAt: IsoDateString;
  /** Customer or supplier name, verbatim. */
  thirdParty: string;
  amount: number;
  /** ISO 4217 code, e.g. `"EUR"`. */
  currency: string;
  status: InvoiceStatus;
};

/** Counters shown above the structured data table. Aggregates, not rows. */
export type StructuredDataMetrics = {
  records: number;
  invoices: number;
  toVerify: number;
};
