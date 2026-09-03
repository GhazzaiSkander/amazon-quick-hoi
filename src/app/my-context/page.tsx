import { useFormatter, useTranslations } from "next-intl";
import { AlertTriangle, Brain, Database, Network, Plus } from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const stats = [
  { key: "companySpaces", value: 0, icon: <Database size={20} /> },
  { key: "privateItems", value: 0, icon: <Brain size={20} /> },
  { key: "graphNodes", value: 0, icon: <Network size={20} /> },
  { key: "gaps", value: 3, icon: <AlertTriangle size={20} /> },
] as const;

const exclusionTypeKeys = ["senderDomain", "filePattern", "folder"] as const;

export default function MyContextPage() {
  const t = useTranslations("myContext");
  const format = useFormatter();

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="border-b border-hoi-border pb-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <Network size={24} />
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
              {(["home", "graph", "memory"] as const).map((key, index) => (
                <button
                  key={key}
                  type="button"
                  className={`border-b-2 pb-3 text-sm font-medium transition ${
                    index === 0
                      ? "border-hoi-navy text-hoi-navy"
                      : "border-transparent text-hoi-muted hover:text-hoi-navy"
                  }`}
                >
                  {t(`tabs.${key}`)}
                </button>
              ))}
            </nav>
          </header>

          <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.key}
                className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-semibold text-hoi-navy">
                    {format.number(stat.value)}
                  </span>

                  <div className="rounded-lg bg-hoi-cream p-2 text-hoi-navy">
                    {stat.icon}
                  </div>
                </div>

                <h2 className="mt-4 font-medium text-hoi-navy">
                  {t(`stats.${stat.key}.label`)}
                </h2>

                <p className="mt-2 text-sm leading-6 text-hoi-muted">
                  {t(`stats.${stat.key}.description`)}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-hoi-navy">
                  {t("baseTitle")}
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  {t("baseDescription")}
                </p>
              </div>

              <span className="text-sm text-hoi-muted">{t("baseBadge")}</span>
            </div>

            <div className="mt-5 flex min-h-32 items-center justify-center rounded-xl border border-dashed border-hoi-border bg-white/60 p-6 text-center">
              <p className="text-sm text-hoi-muted">{t("baseEmpty")}</p>
            </div>

            <button
              type="button"
              className="mt-5 flex items-center gap-2 rounded-lg bg-hoi-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
            >
              <Plus size={17} />
              {t("addSource")}
            </button>
          </section>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-hoi-navy">
                  {t("exclusionsTitle")}
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  {t("exclusionsDescription")}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-[220px_1fr_auto]">
              <select
                defaultValue="senderDomain"
                className="rounded-lg border border-hoi-border bg-white px-4 py-3 text-sm text-hoi-navy outline-none focus:border-hoi-navy"
              >
                {exclusionTypeKeys.map((key) => (
                  <option key={key} value={key}>
                    {t(`exclusionTypes.${key}`)}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder={t("exclusionPlaceholder")}
                className="rounded-lg border border-hoi-border bg-white px-4 py-3 text-sm text-hoi-navy outline-none placeholder:text-hoi-muted/60 focus:border-hoi-navy"
              />

              <button
                type="button"
                className="rounded-lg bg-hoi-navy px-5 py-3 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
              >
                {t("addRule")}
              </button>
            </div>

            <p className="mt-4 text-sm text-hoi-muted">{t("noRules")}</p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
