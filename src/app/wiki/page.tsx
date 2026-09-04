"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Database,
  FolderOpen,
  KeyRound,
  Search,
  ShieldCheck,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import EmptyState from "@/components/ui/EmptyState";
import { vaults, type Vault } from "@/lib/vaults";

export default function WikiPage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations("wiki");
  const tc = useTranslations("common");
  const format = useFormatter();

  /**
   * Filtering runs on the vault name plus its localised category and
   * description, so a search matches whatever the user actually sees.
   */
  const searchableText = useMemo(() => {
    const map = new Map<string, string>();

    for (const vault of vaults) {
      map.set(
        vault.id,
        `${vault.name} ${t(`vaultDescriptions.${vault.id}`)} ${t(
          `categories.${vault.categoryKey}`,
        )}`.toLowerCase(),
      );
    }

    return map;
  }, [t]);

  const filteredVaults = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) {
      return vaults;
    }

    return vaults.filter((vault) =>
      searchableText.get(vault.id)?.includes(normalizedQuery),
    );
  }, [query, searchableText]);

  const selectedVault = vaults.find((vault) => vault.id === selectedId);

  function updatedLabel(vault: Vault) {
    if (vault.updated.kind === "today") return t("updatedToday");
    if (vault.updated.kind === "yesterday") return t("updatedYesterday");
    return t("updatedDaysAgo", { count: vault.updated.days });
  }

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-hoi-accent">
              {t("eyebrow")}
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
              {t("title")}
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
              {t("subtitle")}
            </p>
          </header>

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            <SummaryCard
              icon={<Database size={20} />}
              value={format.number(vaults.length)}
              label={t("summary.vaults")}
            />

            <SummaryCard
              icon={<ShieldCheck size={20} />}
              value={format.number(1, { style: "percent" })}
              label={t("summary.protected")}
            />

            <SummaryCard
              icon={<KeyRound size={20} />}
              value={t("summary.accessValue")}
              label={t("summary.access")}
            />
          </section>

          <section className="mb-8 rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-hoi-navy">
                  {t("yourVaults")}
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  {t("yourVaultsDescription")}
                </p>
              </div>

              <div className="relative w-full md:max-w-sm">
                <Search
                  size={18}
                  className="absolute start-3 top-1/2 -translate-y-1/2 text-hoi-muted"
                />

                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="form-input w-full ps-10"
                />
              </div>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            {filteredVaults.map((vault) => {
              const isSelected = selectedId === vault.id;

              return (
                <button
                  key={vault.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(vault.id);
                    router.push(`/wiki/${vault.id}`);
                  }}
                  className={`rounded-card border bg-hoi-surface p-5 text-start shadow-sm transition ${
                    isSelected
                      ? "border-hoi-accent ring-2 ring-hoi-accent/20"
                      : "border-hoi-border hover:-translate-y-0.5 hover:border-hoi-accent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`rounded-lg p-3 ${vault.color}`}>
                      <FolderOpen size={22} />
                    </div>

                    {isSelected && (
                      <span className="flex items-center gap-1 rounded-full bg-hoi-navy px-3 py-1 text-xs font-medium text-white">
                        <Check size={13} />
                        {tc("selected")}
                      </span>
                    )}
                  </div>

                  <p className="mt-5 text-xs font-medium uppercase tracking-wide text-hoi-muted">
                    {t(`categories.${vault.categoryKey}`)}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-hoi-navy">
                    {vault.name}
                  </h3>

                  <p className="mt-3 min-h-14 text-sm leading-6 text-hoi-muted">
                    {t(`vaultDescriptions.${vault.id}`)}
                  </p>

                  <div className="mt-5 border-t border-hoi-border pt-4">
                    <p className="text-sm font-medium text-hoi-navy">
                      {tc("documents", { count: vault.documentCount })}
                    </p>

                    <p className="mt-1 text-xs text-hoi-muted">
                      {updatedLabel(vault)}
                    </p>
                  </div>
                </button>
              );
            })}
          </section>

          {filteredVaults.length === 0 && (
            <EmptyState
              className="rounded-card border border-dashed border-hoi-border"
              title={t("emptyTitle")}
              description={t("emptyDescription")}
            />
          )}

          <section className="mt-8 rounded-card border border-dashed border-hoi-border bg-white/40 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-3 text-hoi-navy">
                <Database size={20} />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-hoi-navy">
                  {selectedVault
                    ? t("selectedVault", { name: selectedVault.name })
                    : t("selectPrompt")}
                </h2>

                <p className="mt-2 text-sm leading-6 text-hoi-muted">
                  {t("selectDescription")}
                </p>
              </div>

              <ArrowRight
                className="rtl-flip hidden text-hoi-muted sm:block"
                size={20}
              />
            </div>
          </section>

          <section className="mt-8 rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-3 text-hoi-navy">
                <KeyRound size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-hoi-navy">
                  {t("personalContextTitle")}
                </h2>

                <p className="mt-1 text-sm leading-6 text-hoi-muted">
                  {t("personalContextDescription")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function SummaryCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-hoi-cream text-hoi-navy">
        {icon}
      </div>

      <p className="text-2xl font-semibold text-hoi-navy">{value}</p>
      <p className="mt-1 text-sm text-hoi-muted">{label}</p>
    </div>
  );
}
