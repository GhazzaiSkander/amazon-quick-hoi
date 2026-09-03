"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  File,
  FilePlus2,
  FolderOpen,
  Search,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { getVaultName } from "@/lib/vaults";

type SourceStatusKey = "imported" | "validated" | "toValidate";
type SourceCategoryKey = "finance" | "reference" | "process";

/**
 * Source records are business data. Filenames, formats, sizes, contributors and
 * dates stay verbatim; only the category and status labels are translated, and
 * the date is formatted per locale.
 */
const sources: {
  id: string;
  name: string;
  type: string;
  categoryKey: SourceCategoryKey;
  sizeBytes: number;
  addedBy: string;
  date: string;
  statusKey: SourceStatusKey;
}[] = [
  {
    id: "account-move-2026",
    name: "account_move_2026.csv",
    type: "CSV",
    categoryKey: "finance",
    sizeBytes: 202 * 1024 * 1024,
    addedBy: "Skander",
    date: "2026-09-03",
    statusKey: "imported",
  },
  {
    id: "account-move-reference",
    name: "account_move_reference.xlsx",
    type: "Excel",
    categoryKey: "reference",
    sizeBytes: 14 * 1024 * 1024,
    addedBy: "Sabri",
    date: "2026-09-01",
    statusKey: "validated",
  },
  {
    id: "process-onboarding",
    name: "process_onboarding.pdf",
    type: "PDF",
    categoryKey: "process",
    sizeBytes: Math.round(2.4 * 1024 * 1024),
    addedBy: "Camille",
    date: "2026-08-30",
    statusKey: "toValidate",
  },
];

const statusFilterKeys = [
  "all",
  "imported",
  "validated",
  "toValidate",
] as const;

const metrics = { total: 248, validated: 236, pending: 12 };

export default function SourcesPage() {
  const params = useParams<{ vaultId: string }>();
  const router = useRouter();
  const t = useTranslations("sources");
  const tv = useTranslations("vault");
  const tcontribute = useTranslations("contribute");
  const format = useFormatter();

  const vaultName = getVaultName(params.vaultId, tv("fallbackName"));

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusFilterKeys)[number]>("all");

  const filteredSources = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return sources.filter((source) => {
      const matchesQuery =
        !normalizedQuery ||
        `${source.name} ${source.type} ${source.addedBy}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "all" || source.statusKey === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  /** Byte sizes render with the locale's own digits, separator and unit. */
  function formatSize(bytes: number) {
    return tcontribute("fileSize.megabytes", {
      size: format.number(bytes / (1024 * 1024), { maximumFractionDigits: 1 }),
    });
  }

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

          <header className="mb-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-hoi-accent">
                  {t("eyebrow", { vault: vaultName })}
                </p>

                <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
                  {t("title")}
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
                  {t("subtitle")}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  router.push(`/wiki/${params.vaultId}/contribute`)
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-hoi-navy px-4 py-3 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
              >
                <FilePlus2 size={17} />
                {t("addSource")}
              </button>
            </div>
          </header>

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={<File size={20} />}
              value={format.number(metrics.total)}
              label={t("metrics.total")}
            />

            <MetricCard
              icon={<CheckCircle2 size={20} />}
              value={format.number(metrics.validated)}
              label={t("metrics.validated")}
            />

            <MetricCard
              icon={<Clock3 size={20} />}
              value={format.number(metrics.pending)}
              label={t("metrics.pending")}
            />
          </section>

          <section className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="mb-6 flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
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

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as (typeof statusFilterKeys)[number],
                  )
                }
                className="form-input lg:w-52"
              >
                {statusFilterKeys.map((key) => (
                  <option key={key} value={key}>
                    {t(`statuses.${key}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {filteredSources.map((source) => (
                <div
                  key={source.id}
                  className="rounded-xl border border-hoi-border p-5 transition hover:border-hoi-accent"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-hoi-cream p-3 text-hoi-navy">
                        <File size={21} />
                      </div>

                      <div>
                        <h2 className="font-semibold text-hoi-navy">
                          {source.name}
                        </h2>

                        <p className="mt-1 text-sm text-hoi-muted">
                          {t(`descriptions.${source.id}`)}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-hoi-muted">
                          <span className="rounded-full bg-hoi-cream px-3 py-1">
                            {source.type}
                          </span>

                          <span className="rounded-full bg-hoi-cream px-3 py-1">
                            {t(`categories.${source.categoryKey}`)}
                          </span>

                          <span className="rounded-full bg-hoi-cream px-3 py-1">
                            {formatSize(source.sizeBytes)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 text-sm lg:items-end">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                          source.statusKey === "toValidate"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {source.statusKey === "toValidate" ? (
                          <Clock3 size={13} />
                        ) : (
                          <CheckCircle2 size={13} />
                        )}

                        {t(`statuses.${source.statusKey}`)}
                      </span>

                      <p className="text-xs text-hoi-muted">
                        {t("addedBy", { name: source.addedBy })}
                      </p>

                      <p className="text-xs text-hoi-muted">
                        {format.dateTime(new Date(source.date), {
                          dateStyle: "long",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredSources.length === 0 && (
              <div className="py-12 text-center text-sm text-hoi-muted">
                {t("empty")}
              </div>
            )}
          </section>

          <section className="mt-8 rounded-card border border-dashed border-hoi-border bg-white/40 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-3 text-hoi-navy">
                <FolderOpen size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-hoi-navy">
                  {t("importFolderTitle")}
                </h2>

                <p className="mt-2 text-sm leading-6 text-hoi-muted">
                  {t("importFolderDescription")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function MetricCard({
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
