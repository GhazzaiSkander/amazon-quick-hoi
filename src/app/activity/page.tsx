import { useTranslations } from "next-intl";
import {
  CalendarDays,
  CheckSquare2,
  Inbox,
  MessageCircle,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const tabs = [
  { key: "inbox", icon: Inbox },
  { key: "calendar", icon: CalendarDays },
  { key: "todos", icon: CheckSquare2 },
  { key: "channels", icon: MessageCircle },
] as const;

const proactiveAgentKeys = [
  "morningDigest",
  "threadsNeedingReply",
  "weekAhead",
] as const;

const suggestionKeys = ["deck", "metrics"] as const;

export default function ActivityPage() {
  const t = useTranslations("activity");

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="border-b border-hoi-border pb-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <Sparkles size={24} />
              </div>

              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
                  {t("title")}
                </h1>

                <p className="mt-2 text-base leading-7 text-hoi-muted">
                  {t("subtitle")}
                </p>
              </div>
            </div>

            <nav className="mt-8 flex gap-8">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const active = index === 0;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition ${
                      active
                        ? "border-hoi-navy text-hoi-navy"
                        : "border-transparent text-hoi-muted hover:text-hoi-navy"
                    }`}
                  >
                    <Icon size={16} />
                    {t(`tabs.${tab.key}`)}
                  </button>
                );
              })}
            </nav>
          </header>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-semibold text-hoi-navy">{t("forYou")}</h2>

              <span className="rounded-full bg-hoi-cream px-3 py-1 text-xs font-medium text-hoi-navy">
                {t("forYouBadge")}
              </span>
            </div>

            <p className="mt-2 text-sm text-hoi-muted">
              {t("forYouDescription")}
            </p>

            <div className="mt-5 rounded-lg border border-dashed border-hoi-border p-4">
              <p className="mb-3 text-sm font-medium text-hoi-navy">
                {t("enableMore")}
              </p>

              <div className="flex flex-wrap gap-2">
                {proactiveAgentKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    className="rounded-lg border border-hoi-border bg-white px-4 py-2 text-sm text-hoi-navy transition hover:border-hoi-navy"
                  >
                    {t(`agents.${key}`)}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex min-w-64 flex-1 items-center gap-3 rounded-lg border border-hoi-border bg-hoi-surface px-4 py-3">
                <Search size={18} className="text-hoi-muted" />

                <input
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  className="w-full bg-transparent text-sm text-hoi-navy outline-none placeholder:text-hoi-muted/60"
                />
              </div>

              <button
                type="button"
                aria-label={t("refresh")}
                className="rounded-lg border border-hoi-border bg-hoi-surface p-3 text-hoi-muted transition hover:text-hoi-navy"
              >
                <RefreshCw size={18} />
              </button>

              <button
                type="button"
                className="rounded-lg border border-hoi-border bg-hoi-surface px-4 py-3 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
              >
                {t("backfill")}
              </button>

              <button
                type="button"
                className="rounded-lg border border-hoi-border bg-hoi-surface px-4 py-3 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
              >
                {t("editFeed")}
              </button>
            </div>

            <p className="mt-4 text-sm text-hoi-muted">{t("inboxHint")}</p>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-hoi-muted">
                {t("latestEmails")}
              </h2>

              <div className="rounded-card border border-dashed border-hoi-border bg-hoi-surface p-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-hoi-cream text-hoi-navy">
                  <Inbox size={22} />
                </div>

                <h3 className="mt-4 font-semibold text-hoi-navy">
                  {t("connectEmailTitle")}
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-hoi-muted">
                  {t("connectEmailDescription")}
                </p>

                <div className="mt-5 flex justify-center gap-3">
                  <button
                    type="button"
                    className="rounded-lg bg-hoi-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
                  >
                    {t("connectGmail")}
                  </button>

                  <button
                    type="button"
                    className="rounded-lg border border-hoi-border bg-white px-4 py-2 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
                  >
                    {t("connectOutlook")}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-hoi-muted">
                {t("suggestedTasks")}
              </h2>

              <div className="space-y-3">
                {suggestionKeys.map((key) => (
                  <div
                    key={key}
                    className="rounded-card border border-hoi-border bg-hoi-surface p-4 shadow-sm"
                  >
                    <div className="flex gap-3">
                      <CheckSquare2
                        size={18}
                        className="mt-0.5 shrink-0 text-hoi-navy"
                      />

                      <div>
                        <h3 className="text-sm font-semibold text-hoi-navy">
                          {t(`suggestions.${key}.title`)}
                        </h3>

                        <p className="mt-1 text-sm text-hoi-muted">
                          {t(`suggestions.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
