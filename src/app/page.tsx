import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowUp,
  CalendarDays,
  FolderOpen,
  Mail,
  MessageCircle,
  Mic,
  Paperclip,
  Sparkles,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const suggestionKeys = ["launch", "briefing", "sales", "onboarding"] as const;

export default function Home() {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="mb-10">
            <p className="mb-3 text-sm font-medium text-hoi-muted">
              {tc("workspaceEyebrow")}
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy lg:text-5xl">
              {t("title")}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-hoi-muted">
              {t("subtitle")}
            </p>
          </header>

          <section className="rounded-card border border-hoi-border bg-hoi-surface p-4 shadow-sm">
            <textarea
              placeholder={tc("askQuestion")}
              className="min-h-28 w-full resize-none border-0 bg-transparent p-3 text-base text-hoi-navy outline-none placeholder:text-hoi-muted/60"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hoi-border pt-4">
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
                  className="rounded-lg px-3 py-2 text-sm font-medium text-hoi-navy transition hover:bg-hoi-cream"
                >
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
                  aria-label={tc("send")}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-hoi-navy text-white transition hover:bg-hoi-navy-soft"
                >
                  <ArrowUp size={18} />
                </button>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-hoi-navy">
                {t("suggestionsTitle")}
              </h2>

              <span className="text-sm text-hoi-muted">
                {t("suggestionsHint")}
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {suggestionKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  className="rounded-card border border-hoi-border bg-hoi-surface p-5 text-start text-sm font-medium text-hoi-navy shadow-sm transition hover:-translate-y-0.5 hover:border-hoi-accent"
                >
                  {t(`suggestions.${key}`)}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="mb-4 text-lg font-semibold text-hoi-navy">
              {t("connectTitle")}
            </h2>

            <div className="grid gap-4 lg:grid-cols-3">
              <ConnectionCard
                icon={<FolderOpen size={20} />}
                title={t("cards.folders.title")}
                description={t("cards.folders.description")}
                action={t("cards.folders.action")}
              />

              <ConnectionCard
                icon={<Mail size={20} />}
                title={t("cards.email.title")}
                description={t("cards.email.description")}
                action={t("cards.email.action")}
              />

              <ConnectionCard
                icon={<MessageCircle size={20} />}
                title={t("cards.messaging.title")}
                description={t("cards.messaging.description")}
                action={t("cards.messaging.action")}
              />
            </div>
          </section>

          <section className="mt-10 rounded-card border border-dashed border-hoi-border bg-white/40 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-3 text-hoi-navy">
                <CalendarDays size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-hoi-navy">
                  {t("workspaceTitle")}
                </h2>

                <p className="mt-1 text-sm leading-6 text-hoi-muted">
                  {t("workspaceDescription")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function ConnectionCard({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-hoi-cream text-hoi-navy">
        {icon}
      </div>

      <h3 className="font-semibold text-hoi-navy">{title}</h3>

      <p className="mt-2 min-h-10 text-sm leading-5 text-hoi-muted">
        {description}
      </p>

      <button
        type="button"
        className="mt-5 rounded-lg bg-hoi-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
      >
        {action}
      </button>
    </div>
  );
}
