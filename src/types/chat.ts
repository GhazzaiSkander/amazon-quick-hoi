import type { IsoDateString, MessageKey } from "./common";
import type { UserId } from "./user";
import type { VaultId } from "./vault";

export type ChatRole = "user" | "assistant";

/** Context surfaces an answer can lean on, via `chat.contextItems.*`. */
export type ChatContextKey = "myContext" | "company" | "activity";

/** A document an answer leans on, in the assistant or in Deep Search. */
export type Citation = {
  id: string;
  /** Source behind the citation, or `null` when it is not a registered source. */
  sourceId: string | null;
  /** Wiki page behind the citation, or `null` when it is not a page. */
  wikiPageId: string | null;
  /** Filename or page title, shown verbatim. Business data. */
  name: string;
  /** Key describing what was found in it. */
  detailKey: MessageKey;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  role: ChatRole;
  /** Key holding the message text; the prose lives in `messages/*.json`. */
  bodyKey: MessageKey;
  /** Ordered follow-up points rendered under the body. */
  pointKeys: MessageKey[];
  contextKeys: ChatContextKey[];
  /**
   * Documents behind the answer, or `null` when the prototype states how many
   * were used without naming them — never an empty array, which would mean
   * "answered without a source".
   */
  citations: Citation[] | null;
  /** How many documents the answer leans on. */
  citationCount: number;
  createdAt: IsoDateString;
};

export type Conversation = {
  id: string;
  /** Vault the conversation is scoped to, or `null` when it is private. */
  vaultId: VaultId | null;
  ownerUserId: UserId;
  messages: ChatMessage[];
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
};
