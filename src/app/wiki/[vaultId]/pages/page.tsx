"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VaultSelector from "@/components/VaultSelector";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import { useFormatter, useTranslations } from "next-intl";
import { ArrowLeft, CheckCircle2, FileText, Tag } from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { getVaultName, wikiPages } from "@/lib/mock-data";
import type { VaultId, WikiPageType } from "@/types";

const typeFilterKeys = [
  "all",
  "document",
  "organisation",
  "category",
  "other",
] as const satisfies ("all" | WikiPageType)[];

export default function WikiPagesPage() {
  const router = useRouter();
  const params = useParams<{ vaultId: string }>();
  const t = useTranslations("wikiPages");
  const tc = useTranslations("common");
  const tv = useTranslations("vault");
  const format = useFormatter();

  const vaultName = getVaultName(params.vaultId, tv("fallbackName"));

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] =
    useState<(typeof typeFilterKeys)[number]>("all");
  const [selectedId, setSelectedId] = useState("articles");

  const filteredPages = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return wikiPages.filter((page) => {
      const title = t(`items.${page.id}.title`);
      const tags = page.tags.map((tag) => t(`tags.${tag}`)).join(" ");

      const matchesQuery =
        !normalizedQuery ||
        `${title} ${page.path} ${page.tags.join(" ")} ${tags}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesType = typeFilter === "all" || page.type === typeFilter;

      return matchesQuery && matchesType;
    });
  }, [query, typeFilter, t]);

  const selectedPage =
    wikiPages.find((page) => page.id === selectedId) ?? filteredPages[0];

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href={`/wiki/${params.vaultId}`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-hoi-muted hover:text-hoi-navy"
          >
            <ArrowLeft size={16} className="rtl-flip" />
            {tv("backToVault", { name: vaultName })}
          </Link>

          <PageHeader
            eyebrow={t("eyebrow", { vault: vaultName })}
            title={t("title")}
            description={t("subtitle")}
          />

          <div className="mb-6 flex justify-end">
            <VaultSelector
              value={params.vaultId as VaultId}
              label={tv("eyebrow")}
              onChange={(nextVaultId) => {
                router.push(`/wiki/${nextVaultId}/pages`);
              }}
            />
          </div>

          <section className="mb-6 rounded-card border border-hoi-border bg-hoi-surface p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row">
              <SearchInput
                containerClassName="flex-1"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("searchPlaceholder")}
              />

              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(
                    event.target.value as (typeof typeFilterKeys)[number],
                  )
                }
                className="form-input lg:w-52"
              >
                {typeFilterKeys.map((key) => (
                  <option key={key} value={key}>
                    {t(`types.${key}`)}
                  </option>
                ))}
              </select>
            </div>

            <p className="mt-3 text-xs text-hoi-muted">{t("searchHint")}</p>
          </section>

          <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
            <section className="rounded-card border border-hoi-border bg-hoi-surface p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-hoi-navy">
                  {t("listTitle")}
                </h2>

                <span className="text-xs text-hoi-muted">
                  {tc("results", { count: filteredPages.length })}
                </span>
              </div>

              <div className="space-y-2">
                {filteredPages.map((page) => {
                  const isSelected = selectedPage?.id === page.id;

                  return (
                    <button
                      key={page.id}
                      type="button"
                      onClick={() => setSelectedId(page.id)}
                      className={`w-full rounded-lg border p-3 text-start transition ${
                        isSelected
                          ? "border-hoi-accent bg-blue-50"
                          : "border-transparent hover:border-hoi-border hover:bg-hoi-cream"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <FileText
                          size={17}
                          className="mt-0.5 shrink-0 text-hoi-navy"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-hoi-navy">
                            {t(`items.${page.id}.title`)}
                          </p>

                          <p className="mt-1 text-xs text-hoi-muted">
                            {t(`types.${page.type}`)} ·{" "}
                            {t(`status.${page.status}`)}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              {selectedPage ? (
                <>
                  <div className="flex flex-col gap-4 border-b border-hoi-border pb-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-xs text-hoi-muted">
                        <CheckCircle2
                          size={15}
                          className={
                            selectedPage.status === "verified"
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }
                        />
                        {t(`status.${selectedPage.status}`)}
                      </div>

                      <p className="break-all text-xs text-hoi-muted">
                        {selectedPage.path}
                      </p>

                      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-hoi-navy">
                        {t(`items.${selectedPage.id}.title`)}
                      </h2>

                      <p className="mt-3 text-base leading-7 text-hoi-muted">
                        {t(`items.${selectedPage.id}.description`)}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 rounded-lg border border-hoi-border px-4 py-2 text-sm font-medium text-hoi-navy hover:bg-hoi-cream"
                    >
                      {t("edit")}
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedPage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full border border-hoi-border px-3 py-1 text-xs text-hoi-muted"
                      >
                        <Tag size={13} />
                        {t(`tags.${tag}`)}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 rounded-xl border border-hoi-border bg-hoi-cream/50 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-hoi-muted">
                      {t("metadataTitle")}
                    </h3>

                    <div className="mt-4 divide-y divide-hoi-border">
                      {Object.entries(selectedPage.metadata).map(
                        ([labelKey, value]) => (
                          <div
                            key={labelKey}
                            className="grid gap-2 py-3 text-sm md:grid-cols-[160px_1fr]"
                          >
                            <span className="text-hoi-muted">
                              {t(`metadataLabels.${labelKey}`)}
                            </span>
                            <span className="font-medium text-hoi-navy">
                              {typeof value === "number"
                                ? format.number(value)
                                : value}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-hoi-navy">
                      {t("provenanceTitle")}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-hoi-muted">
                      {t("provenanceDescription")}
                    </p>
                  </div>
                </>
              ) : (
                <EmptyState title={t("empty")} />
              )}
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
