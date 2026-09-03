import { useTranslations } from "next-intl";
import {
  Bot,
  Grid2X2,
  List,
  Plus,
  Search,
  Sparkles,
  Store,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const tabs = [
  { key: "agents", icon: Bot },
  { key: "skills", icon: Sparkles },
  { key: "marketplace", icon: Store },
  { key: "browse", icon: Search },
] as const;

const filterKeys = ["all", "recent", "favorites", "shared"] as const;

const featureKeys = ["instructions", "tools", "knowledge"] as const;

export default function AgentsSkillsPage() {
  const t = useTranslations("agents");
  const tc = useTranslations("common");

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="border-b border-hoi-border pb-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <Bot size={24} />
              </div>

              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
                  {t("title")}
                </h1>

                <p className="mt-2 max-w-3xl text-base leading-7 text-hoi-muted">
                  {t("subtitle")}
                </p>
              </div>
            </div>

            <nav className="mt-8 flex flex-wrap gap-8">
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
                className="rounded-lg border border-hoi-border bg-hoi-surface p-3 text-hoi-muted transition hover:text-hoi-navy"
                aria-label={tc("gridView")}
              >
                <Grid2X2 size={18} />
              </button>

              <button
                type="button"
                className="rounded-lg border border-hoi-border bg-hoi-surface p-3 text-hoi-muted transition hover:text-hoi-navy"
                aria-label={tc("listView")}
              >
                <List size={18} />
              </button>

              <button
                type="button"
                className="rounded-lg border border-hoi-border bg-hoi-surface px-4 py-3 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
              >
                {tc("browse")}
              </button>

              <Link
                href="/agents-skills/create"
                className="flex items-center gap-2 rounded-lg bg-hoi-navy px-4 py-3 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
              >
                <Plus size={17} />
                {tc("create")}
              </Link>

              <button
                type="button"
                className="rounded-lg border border-hoi-border bg-hoi-surface px-4 py-3 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
              >
                {t("createFromChat")}
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {filterKeys.map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    index === 0
                      ? "border-hoi-navy bg-white text-hoi-navy"
                      : "border-hoi-border bg-hoi-surface text-hoi-muted hover:text-hoi-navy"
                  }`}
                >
                  {t(`filters.${filter}`)}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="flex min-h-80 items-center justify-center rounded-card border border-dashed border-hoi-border bg-hoi-surface p-10 text-center">
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-hoi-cream text-hoi-navy">
                  <Bot size={25} />
                </div>

                <h2 className="mt-5 font-semibold text-hoi-navy">
                  {t("emptyTitle")}
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-hoi-muted">
                  {t("emptyDescription")}
                </p>

                <Link
                  href="/agents-skills/create"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-hoi-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
                >
                  <Plus size={17} />
                  {t("createAgent")}
                </Link>
              </div>
            </div>

            <div className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-hoi-cream text-hoi-navy">
                <WandSparkles size={21} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-hoi-navy">
                {t("buildTitle")}
              </h2>

              <p className="mt-2 text-sm leading-6 text-hoi-muted">
                {t("buildDescription")}
              </p>

              <div className="mt-6 space-y-3">
                {featureKeys.map((key) => (
                  <div
                    key={key}
                    className="rounded-lg border border-hoi-border bg-white p-4"
                  >
                    <p className="text-sm font-medium text-hoi-navy">
                      {t(`features.${key}.title`)}
                    </p>
                    <p className="mt-1 text-xs text-hoi-muted">
                      {t(`features.${key}.description`)}
                    </p>
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
