import type { User, UserId } from "@/types";

/**
 * Contributors of the demo vault. The prototype only knows their display name,
 * so `email` is explicitly `null` rather than a plausible-looking address.
 */
export const users = [
  { id: "skander", name: "Skander", email: null },
  { id: "sabri", name: "Sabri", email: null },
  { id: "camille", name: "Camille", email: null },
] satisfies User[];

/** Names are business data, so the fallback is the raw id, never a label. */
export function getUserName(userId: UserId): string {
  return users.find((user) => user.id === userId)?.name ?? userId;
}
