import type { IsoDateString } from "./common";
import type { UserId } from "./user";
import type { VaultId } from "./vault";

/**
 * Where an item stands in the human review queue. `toReview` is the pending
 * state: nothing reaches `validated` without a human decision.
 *
 * The values double as `review.statuses.*` message keys.
 */
export type ReviewStatus = "toReview" | "validated";

/** What is being reviewed. Translated through `review.types.*`. */
export type ReviewType = "structuredData" | "wikiPage";

/** Extraction confidence bucket, via `review.confidence.*`. */
export type ReviewConfidence = "high" | "medium" | "low" | "validated";

/** Decision a reviewer can take, via `reviewDetail.decisions.*`. */
export type ReviewDecision = "accept" | "requestFix" | "reject";

/**
 * Mock-only rendering hint that keeps "Today at 09:42" stable whatever day the
 * prototype is opened. `time` mirrors the clock time already held by
 * `submittedAt`; the API will send the timestamp alone and the UI will derive
 * the wording from it.
 */
export type ReviewSubmittedLabel =
  | { kind: "todayAt"; time: string }
  | { kind: "yesterdayAt"; time: string }
  | { kind: "absolute" };

export type ReviewItem = {
  id: string;
  vaultId: VaultId;
  type: ReviewType;
  status: ReviewStatus;
  confidence: ReviewConfidence;
  /** Provenance: the source the proposal was extracted from. */
  sourceId: string;
  submittedByUserId: UserId;
  submittedAt: IsoDateString;
  submittedAtLabel: ReviewSubmittedLabel;
};

/** Field names of a proposal, translated through `reviewDetail.fields.*`. */
export type ReviewFieldKey =
  | "invoiceNumber"
  | "thirdParty"
  | "amount"
  | "status"
  | "type"
  | "name"
  | "source"
  | "itemCount"
  | "pageName"
  | "sourcePages";

/**
 * An extracted value is either raw business data (`raw`), a keyed label from
 * `reviewDetail.values.*`, a currency amount, a number, or a page range. Each
 * variant tells the screen how to format it for the active locale.
 */
export type ReviewFieldValue =
  | { kind: "raw"; value: string }
  | { kind: "key"; key: string }
  | { kind: "currency"; amount: number; currency: string }
  | { kind: "number"; value: number }
  | { kind: "pageRange"; from: number; to: number };

export type ReviewField = {
  key: ReviewFieldKey;
  value: ReviewFieldValue;
  /** Model confidence between 0 and 1, rendered as a percentage. */
  confidence: number;
};

/**
 * Detail of a queued proposal. Source and author are not repeated here: they
 * belong to the matching {@link ReviewItem}.
 */
export type ReviewDetail = {
  reviewId: string;
  extractedFields: ReviewField[];
};

/** Counters shown above the review queue. Aggregates, not rows. */
export type ReviewMetrics = {
  toReview: number;
  validatedThisWeek: number;
  contributors: number;
};
