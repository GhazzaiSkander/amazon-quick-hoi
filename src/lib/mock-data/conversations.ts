import type { Citation, Conversation } from "@/types";

/**
 * The assistant thread shown on `/chat`.
 *
 * Message prose lives in `messages/*.json` under the `chat` namespace; the
 * fixture only holds keys, so the thread reads correctly in French, English and
 * Arabic. The answer states how many sources it leans on without naming them,
 * so `citations` is `null` — not an empty array, which would mean "answered
 * without a source".
 */
export const demoConversation = {
  id: "conversation-demo",
  vaultId: null,
  ownerUserId: "skander",
  createdAt: "2026-09-04T08:58:00",
  updatedAt: "2026-09-04T09:01:00",
  messages: [
    {
      id: "message-1",
      conversationId: "conversation-demo",
      role: "user",
      bodyKey: "sampleQuestion",
      pointKeys: [],
      contextKeys: [],
      citations: null,
      citationCount: 0,
      createdAt: "2026-09-04T08:58:00",
    },
    {
      id: "message-2",
      conversationId: "conversation-demo",
      role: "assistant",
      bodyKey: "sampleAnswerIntro",
      pointKeys: ["sampleAnswer.one", "sampleAnswer.two", "sampleAnswer.three"],
      contextKeys: ["myContext", "activity"],
      citations: null,
      citationCount: 3,
      createdAt: "2026-09-04T09:01:00",
    },
  ],
} satisfies Conversation;

/**
 * Documents cited by the Deep Search answer. Names are business data;
 * `detailKey` points at `deepSearch.citations.*`. `process_paiement.pdf` is not
 * one of the vault's registered sources, so its relation stays `null` rather
 * than being pointed at a look-alike file.
 */
export const deepSearchCitations = [
  {
    id: "citation-invoices",
    sourceId: "account-move-2026",
    wikiPageId: null,
    name: "account_move_2026.csv",
    detailKey: "citations.invoices",
  },
  {
    id: "citation-wiki-page",
    sourceId: null,
    wikiPageId: "factures-janvier",
    name: "Factures — Janvier 2026",
    detailKey: "citations.wikiPage",
  },
  {
    id: "citation-procedure",
    sourceId: null,
    wikiPageId: null,
    name: "process_paiement.pdf",
    detailKey: "citations.procedure",
  },
] satisfies Citation[];
