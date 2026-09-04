import type { Invoice, StructuredDataMetrics } from "@/types";

/**
 * Invoices extracted from `account_move_2026.csv`.
 *
 * Numbers, dates, amounts and third parties are business data and stay
 * verbatim; `status` is a key the screens translate. FA2510110 stays in
 * `toVerify`: it is the row the review queue is asking a human to confirm.
 */
export const invoices = [
  {
    id: "FA2515312",
    vaultId: "comptabilite-2026",
    type: "invoice",
    sourceId: "account-move-2026",
    number: "FA2515312",
    issuedAt: "2026-01-08",
    thirdParty: "Vanhoeve Dylan",
    amount: 1245,
    currency: "EUR",
    status: "paid",
  },
  {
    id: "FA2514447",
    vaultId: "comptabilite-2026",
    type: "invoice",
    sourceId: "account-move-2026",
    number: "FA2514447",
    issuedAt: "2026-01-16",
    thirdParty: "Lixxball",
    amount: 860.5,
    currency: "EUR",
    status: "paid",
  },
  {
    id: "FA2510110",
    vaultId: "comptabilite-2026",
    type: "invoice",
    sourceId: "account-move-2026",
    number: "FA2510110",
    issuedAt: "2026-02-22",
    thirdParty: "Avenir Énergie",
    amount: 3420,
    currency: "EUR",
    status: "toVerify",
  },
  {
    id: "FA2504135",
    vaultId: "comptabilite-2026",
    type: "invoice",
    sourceId: "account-move-2026",
    number: "FA2504135",
    issuedAt: "2026-03-17",
    thirdParty: "Ciblex Express",
    amount: 2180.75,
    currency: "EUR",
    status: "paid",
  },
] satisfies Invoice[];

export function findInvoice(invoiceId: string): Invoice | null {
  return invoices.find((invoice) => invoice.id === invoiceId) ?? null;
}

/** Counters above the table: aggregates over the vault, not over `invoices`. */
export const structuredDataMetrics = {
  records: 49920,
  invoices: 4238,
  toVerify: 12,
} satisfies StructuredDataMetrics;
