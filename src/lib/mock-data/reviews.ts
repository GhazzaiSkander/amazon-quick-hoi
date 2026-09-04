import type { ReviewDetail, ReviewItem, ReviewMetrics } from "@/types";

/**
 * Human review queue.
 *
 * Ids double as message keys (`review.items.<id>.*`), so they are stable. Each
 * item keeps its provenance (`sourceId`, `submittedByUserId`) and its own
 * status: nothing is promoted to `validated` without a reviewer.
 */
export const reviewItems = [
  {
    id: "review-1",
    vaultId: "comptabilite-2026",
    type: "structuredData",
    status: "toReview",
    confidence: "medium",
    sourceId: "account-move-2026",
    submittedByUserId: "skander",
    submittedAt: "2026-09-04T09:42:00",
    submittedAtLabel: { kind: "todayAt", time: "09:42" },
  },
  {
    id: "review-2",
    vaultId: "comptabilite-2026",
    type: "wikiPage",
    status: "toReview",
    confidence: "high",
    sourceId: "account-move-reference",
    submittedByUserId: "sabri",
    submittedAt: "2026-09-03T16:20:00",
    submittedAtLabel: { kind: "yesterdayAt", time: "16:20" },
  },
  {
    id: "review-3",
    vaultId: "comptabilite-2026",
    type: "wikiPage",
    status: "toReview",
    confidence: "low",
    sourceId: "process-onboarding",
    submittedByUserId: "camille",
    submittedAt: "2026-08-30",
    submittedAtLabel: { kind: "absolute" },
  },
  {
    id: "review-4",
    vaultId: "comptabilite-2026",
    type: "structuredData",
    status: "validated",
    confidence: "validated",
    sourceId: "account-move-2026",
    submittedByUserId: "skander",
    submittedAt: "2026-08-29",
    submittedAtLabel: { kind: "absolute" },
  },
] satisfies ReviewItem[];

/**
 * Fields proposed for each queued item, keyed by review id. Source and author
 * are not repeated here: they belong to the matching {@link reviewItems} entry.
 * `review-4` has no entry — it is already validated.
 */
export const reviewDetails = {
  "review-1": {
    reviewId: "review-1",
    extractedFields: [
      {
        key: "invoiceNumber",
        value: { kind: "raw", value: "FA2510110" },
        confidence: 0.94,
      },
      {
        key: "thirdParty",
        value: { kind: "raw", value: "Avenir Énergie" },
        confidence: 0.81,
      },
      {
        key: "amount",
        value: { kind: "currency", amount: 3420, currency: "EUR" },
        confidence: 0.96,
      },
      {
        key: "status",
        value: { kind: "key", key: "toVerify" },
        confidence: 0.62,
      },
    ],
  },
  "review-2": {
    reviewId: "review-2",
    extractedFields: [
      {
        key: "type",
        value: { kind: "raw", value: "categorie" },
        confidence: 0.99,
      },
      {
        key: "name",
        value: { kind: "raw", value: "ARTICLES" },
        confidence: 0.99,
      },
      {
        key: "source",
        value: { kind: "raw", value: "account_move_reference.xlsx" },
        confidence: 0.97,
      },
      {
        key: "itemCount",
        value: { kind: "number", value: 2157 },
        confidence: 0.88,
      },
    ],
  },
  "review-3": {
    reviewId: "review-3",
    extractedFields: [
      {
        key: "pageName",
        value: { kind: "key", key: "onboardingProcess" },
        confidence: 0.96,
      },
      {
        key: "type",
        value: { kind: "raw", value: "process" },
        confidence: 0.91,
      },
      {
        key: "sourcePages",
        value: { kind: "pageRange", from: 12, to: 18 },
        confidence: 0.74,
      },
      {
        key: "status",
        value: { kind: "key", key: "toValidate" },
        confidence: 0.69,
      },
    ],
  },
} satisfies Record<string, ReviewDetail>;

export function findReviewItem(reviewId: string): ReviewItem | null {
  return reviewItems.find((item) => item.id === reviewId) ?? null;
}

export function findReviewDetail(reviewId: string): ReviewDetail | null {
  return reviewDetails[reviewId as keyof typeof reviewDetails] ?? null;
}

/**
 * The review screen shows one source excerpt, and it is the invoice row a
 * reviewer is asked to confirm. Referenced by id so the values are read from
 * the structured data fixtures instead of being restated.
 */
export const reviewExcerptInvoiceId = "FA2510110";

/** Counters above the queue: aggregates over the vault, not over `reviewItems`. */
export const reviewMetrics = {
  toReview: 12,
  validatedThisWeek: 48,
  contributors: 3,
} satisfies ReviewMetrics;
