import type { MetadataValue } from "./common";
import type { VaultId } from "./vault";

/** Translated through `wikiPages.types.*`. */
export type WikiPageType = "document" | "organisation" | "category" | "other";

/** Translated through `wikiPages.status.*`. */
export type WikiPageStatus = "verified" | "toVerify";

/** Tag slugs, translated through `wikiPages.tags.*`. */
export type WikiPageTag =
  | "produit"
  | "référentiel"
  | "client"
  | "commercial"
  | "facture"
  | "finance"
  | "processus"
  | "équipe";

/** Labels of the extracted metadata rows, via `wikiPages.metadataLabels.*`. */
export type WikiPageMetadataKey =
  | "type"
  | "name"
  | "identity"
  | "source"
  | "sheet"
  | "rows"
  | "page";

/**
 * Metadata read out of the original document, in display order. Values are
 * business data — a number stays a number so the screen can format it per
 * locale.
 */
export type WikiPageMetadata = Partial<
  Record<WikiPageMetadataKey, MetadataValue>
>;

export type WikiPage = {
  id: string;
  vaultId: VaultId;
  type: WikiPageType;
  status: WikiPageStatus;
  /** Path in the wiki tree. Business data: never translated. */
  path: string;
  tags: WikiPageTag[];
  /**
   * Source the page was extracted from, or `null` when the document it quotes
   * is not (yet) one of the vault's registered sources.
   */
  sourceId: string | null;
  metadata: WikiPageMetadata;
};
