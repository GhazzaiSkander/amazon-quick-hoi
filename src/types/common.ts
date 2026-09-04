/**
 * Building blocks shared by every domain type.
 *
 * The frontend prototype runs on fixtures, but these types are shaped like the
 * API responses that will replace them: stable identifiers, ISO dates, and a
 * strict separation between business data and user-visible labels.
 */

/**
 * ISO 8601 date (`"2026-01-08"`) or local date-time (`"2026-01-08T09:42:00"`).
 * Always ISO in the data layer; every screen formats it through `next-intl`.
 */
export type IsoDateString = string;

/**
 * Key into `messages/*.json`, relative to the namespace of the screen that
 * renders it — never a user-visible label. Storing keys instead of prose is
 * what keeps French, English and Arabic working from a single fixture.
 */
export type MessageKey = string;

/** Value of an extracted metadata field. `null` means "known to be absent". */
export type MetadataValue = string | number | boolean | null;

/** Free-form metadata bag, as returned by an extraction pipeline. */
export type Metadata = Record<string, MetadataValue>;
