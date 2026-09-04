/**
 * Frontend fixtures.
 *
 * The application is frontend-only for now: every screen reads from here rather
 * than from an API. The shapes come from `@/types`, so replacing a fixture with
 * a real response later is an import change, not a rewrite.
 *
 * Two conventions hold across the whole folder:
 *
 * - User-visible wording is never stored here. Fixtures carry stable keys
 *   (`status`, `category`, ids used as `messages/*.json` keys) and the screens
 *   resolve them through `next-intl`, so the three locales keep working.
 * - Every row is tagged with the vault it belongs to. The screens still render
 *   the whole demo set whatever vault is in the URL; scoping by vault is left
 *   to the API step so the prototype keeps showing content for every vault.
 */
export * from "./conversations";
export * from "./reviews";
export * from "./sources";
export * from "./structured-data";
export * from "./users";
export * from "./vaults";
export * from "./wiki-pages";
