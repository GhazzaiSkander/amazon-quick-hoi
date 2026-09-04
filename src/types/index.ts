/**
 * Frontend domain types.
 *
 * They describe what the interface manipulates, not what a backend returns
 * today: identifiers are stable, dates are ISO, user-visible wording is kept
 * out (screens resolve message keys through `next-intl`), and an unknown value
 * is `null` rather than a plausible-looking placeholder.
 */
export type * from "./chat";
export type * from "./common";
export type * from "./review";
export type * from "./source";
export type * from "./structured-data";
export type * from "./user";
export type * from "./vault";
export type * from "./wiki";
