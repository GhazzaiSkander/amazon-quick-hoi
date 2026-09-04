"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import {
  ArrowUp,
  BookOpen,
  Bot,
  ChevronDown,
  Mic,
  MoreHorizontal,
  Paperclip,
  Sparkles,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import VaultSelector from "@/components/VaultSelector";
import { demoConversation, isVaultId, vaultNames } from "@/lib/mock-data";
import type { ChatContextKey, ChatMessage } from "@/types";

/** Context surfaces offered in the side panel. */
const contextItemKeys = [
  "myContext",
  "company",
  "activity",
] as const satisfies ChatContextKey[];

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("chat");
  const tc = useTranslations("common");
  const format = useFormatter();

  // The ?vaultId= query param scopes the conversation and must survive i18n.
  // It is untrusted input, so an unknown id is treated as "no vault selected".
  const rawVaultId = searchParams.get("vaultId");
  const vaultId = isVaultId(rawVaultId) ? rawVaultId : null;
  const activeVault = vaultId ? vaultNames[vaultId] : null;

  const messages: ChatMessage[] = demoConversation.messages;

  const [includePersonalContext, setIncludePersonalContext] = useState(false);
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState<string | null>(
    null,
  );

  function handleSubmit() {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    setSubmittedQuestion(trimmedQuestion);
    setQuestion("");
  }

  return (
    <AppShell>
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b border-hoi-border bg-hoi-surface px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-hoi-cream p-2 text-hoi-navy">
                <Bot size={18} />
              </div>

              <h1 className="font-semibold text-hoi-navy">
                {activeVault ? t("assistantWiki") : t("assistantGeneral")}
              </h1>

              <ChevronDown size={16} className="text-hoi-muted" />
            </div>

            <p className="mt-1 text-sm text-hoi-muted">
              {activeVault
                ? t("activeVault", { name: activeVault })
                : t("privateConversation")}
            </p>
          </div>

          <button
            type="button"
            aria-label={t("conversationOptions")}
            className="rounded-lg p-2 text-hoi-muted transition hover:bg-hoi-cream hover:text-hoi-navy"
          >
            <MoreHorizontal size={20} />
          </button>
        </header>

        <button
          type="button"
          onClick={() => setIncludePersonalContext(!includePersonalContext)}
          className={`mb-5 w-full rounded-xl border p-4 text-start transition ${
            includePersonalContext
              ? "border-emerald-200 bg-emerald-50"
              : "border-hoi-border bg-white hover:border-hoi-accent"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-hoi-muted">
            {t("personalContext")}
          </p>

          <p
            className={`mt-2 text-sm font-medium ${
              includePersonalContext ? "text-emerald-800" : "text-hoi-navy"
            }`}
          >
            {includePersonalContext
              ? t("personalContextOn")
              : t("personalContextOff")}
          </p>

          <p className="mt-1 text-xs leading-5 text-hoi-muted">
            {includePersonalContext
              ? t("personalContextOnHint")
              : t("personalContextOffHint")}
          </p>
        </button>

        <div className="flex flex-1 flex-col lg:flex-row">
          <main className="flex flex-1 flex-col">
            <div className="flex-1 px-6 py-8 lg:px-16">
              <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                  <p className="text-sm font-medium text-hoi-muted">
                    {t("today")}
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-hoi-navy">
                    {t("greeting")}
                  </h2>
                </div>

                <div className="space-y-6">
                  {messages.map((message) =>
                    message.role === "user" ? (
                      <div key={message.id} className="flex justify-end">
                        <div className="max-w-xl rounded-2xl rounded-ee-md bg-hoi-navy px-5 py-4 text-sm leading-6 text-white">
                          {t(message.bodyKey)}
                        </div>
                      </div>
                    ) : (
                      <div key={message.id} className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-hoi-cream text-hoi-navy">
                          <Sparkles size={18} />
                        </div>

                        <div className="max-w-2xl rounded-2xl rounded-ss-md border border-hoi-border bg-hoi-surface px-5 py-4">
                          <p className="text-sm leading-7 text-hoi-navy">
                            {t(message.bodyKey)}
                          </p>

                          <ol className="mt-3 space-y-3 text-sm leading-6 text-hoi-navy">
                            {message.pointKeys.map((pointKey, index) => (
                              <li key={pointKey}>
                                <span className="font-semibold">
                                  {format.number(index + 1)}.
                                </span>{" "}
                                {t(pointKey)}
                              </li>
                            ))}
                          </ol>

                          <div className="mt-5 flex flex-wrap gap-2 border-t border-hoi-border pt-4">
                            {message.contextKeys.map((contextKey) => (
                              <span
                                key={contextKey}
                                className="rounded-full bg-hoi-cream px-3 py-1 text-xs text-hoi-navy"
                              >
                                {t(`contextItems.${contextKey}.title`)}
                              </span>
                            ))}

                            <span className="rounded-full bg-hoi-cream px-3 py-1 text-xs text-hoi-navy">
                              {t("sourcesCount", {
                                count: message.citationCount,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 pb-8 lg:px-16">
              <div className="mx-auto max-w-3xl">
                <div className="rounded-2xl border border-hoi-border bg-hoi-surface p-4 shadow-sm">
                  <textarea
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder={tc("askQuestion")}
                    className="min-h-24 w-full resize-none border-0 bg-transparent p-2 text-sm leading-6 text-hoi-navy outline-none placeholder:text-hoi-muted/60"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hoi-border pt-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={tc("attachFile")}
                        className="rounded-lg p-2 text-hoi-muted transition hover:bg-hoi-cream hover:text-hoi-navy"
                      >
                        <Paperclip size={18} />
                      </button>

                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-hoi-navy transition hover:bg-hoi-cream"
                      >
                        <BookOpen size={16} />
                        {tc("allTools")}
                      </button>

                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-hoi-navy transition hover:bg-hoi-cream"
                      >
                        <Sparkles size={16} />
                        {tc("smart")}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={tc("useMicrophone")}
                        className="rounded-lg p-2 text-hoi-muted transition hover:bg-hoi-cream hover:text-hoi-navy"
                      >
                        <Mic size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!question.trim()}
                        aria-label={t("sendMessage")}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-hoi-navy text-white transition hover:bg-hoi-navy-soft"
                      >
                        <ArrowUp size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {submittedQuestion && (
                  <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-900">
                      {t("questionSent")}
                    </p>

                    <p className="mt-2 text-sm text-blue-800">
                      « {submittedQuestion} »
                    </p>

                    <div className="mt-4 border-t border-blue-200 pt-4">
                      <p className="text-sm font-medium text-blue-900">
                        {t("demoAnswerTitle")}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-blue-800">
                        {t("demoAnswer")}
                      </p>

                      {activeVault && (
                        <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs text-blue-700">
                          {t("scope", { name: activeVault })}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <p className="mt-3 text-center text-xs text-hoi-muted">
                  {t("disclaimer")}
                </p>
              </div>
            </div>
          </main>

          <aside className="hidden w-80 border-s border-hoi-border bg-hoi-surface p-6 xl:block">
            <h2 className="font-semibold text-hoi-navy">
              {t("activeContext")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-hoi-muted">
              {t("activeContextDescription")}
            </p>

            {activeVault && (
              <div className="mb-5 mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <VaultSelector
                  id="chat-vault-selector"
                  value={vaultId}
                  label={t("selectedScope")}
                  onChange={(nextVaultId) => {
                    router.push(`/chat?vaultId=${nextVaultId}`);
                  }}
                />

                <p className="mt-1 text-xs leading-5 text-blue-800">
                  {t("vaultHint")}
                </p>
              </div>
            )}

            <Link
              href="/wiki"
              className="mt-3 inline-flex text-xs font-medium text-blue-700 hover:text-blue-900"
            >
              {t("changeVault")}{" "}
              <span aria-hidden className="rtl-flip ms-1 inline-block">
                →
              </span>
            </Link>

            <div className="mt-6 space-y-3">
              {contextItemKeys.map((key) => (
                <ContextItem
                  key={key}
                  title={t(`contextItems.${key}.title`)}
                  description={t(`contextItems.${key}.description`)}
                />
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-hoi-border bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-hoi-muted">
                {t("permissions")}
              </p>

              <p className="mt-2 text-sm leading-6 text-hoi-navy">
                {t("permissionsValue")}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

function ContextItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-hoi-border bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-hoi-cream p-2 text-hoi-navy">
          <BookOpen size={16} />
        </div>

        <div>
          <h3 className="text-sm font-medium text-hoi-navy">{title}</h3>
          <p className="mt-1 text-xs text-hoi-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}
