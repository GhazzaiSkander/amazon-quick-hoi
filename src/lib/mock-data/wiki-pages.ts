import type { WikiPage } from "@/types";

/**
 * Wiki pages of the demo vault.
 *
 * Ids double as message keys (`wikiPages.items.<id>.*`), so they are stable and
 * must not be renamed without updating the three locales. Paths, identifiers
 * and metadata values are business data and stay verbatim.
 *
 * `metadata.source` is the filename as the extractor read it in the document;
 * `sourceId` is the resolved relation, `null` when that file is not (yet) one
 * of the vault's registered sources.
 */
export const wikiPages = [
  {
    id: "articles",
    vaultId: "comptabilite-2026",
    type: "category",
    status: "verified",
    path: "wiki/entities/categories/articles.md",
    tags: ["produit", "référentiel"],
    sourceId: "account-move-reference",
    metadata: {
      type: "categorie",
      name: "ARTICLES",
      identity: "name:articles",
      source: "account_move_reference.xlsx",
      sheet: "Factures",
    },
  },
  {
    id: "clients",
    vaultId: "comptabilite-2026",
    type: "organisation",
    status: "verified",
    path: "wiki/entities/organisations/clients.md",
    tags: ["client", "commercial"],
    sourceId: null,
    metadata: {
      type: "organisation",
      name: "Clients",
      identity: "entity:clients",
      source: "customers_2026.xlsx",
      sheet: "Clients",
    },
  },
  {
    id: "factures-janvier",
    vaultId: "comptabilite-2026",
    type: "document",
    status: "toVerify",
    path: "wiki/finance/factures/2026-01.md",
    tags: ["facture", "finance"],
    sourceId: "account-move-2026",
    metadata: {
      type: "factures",
      name: "Factures — Janvier 2026",
      identity: "finance:invoices:2026-01",
      source: "account_move_2026.csv",
      rows: 4238,
    },
  },
  {
    id: "processus-onboarding",
    vaultId: "comptabilite-2026",
    type: "other",
    status: "verified",
    path: "wiki/processes/onboarding.md",
    tags: ["processus", "équipe"],
    sourceId: null,
    metadata: {
      type: "process",
      name: "Processus d’onboarding",
      identity: "process:onboarding",
      source: "processes_company.pdf",
      page: "12-18",
    },
  },
] satisfies WikiPage[];

export function findWikiPage(wikiPageId: string): WikiPage | null {
  return wikiPages.find((page) => page.id === wikiPageId) ?? null;
}
