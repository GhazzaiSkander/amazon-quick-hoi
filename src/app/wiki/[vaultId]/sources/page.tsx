"use client";
import VaultSelector from "@/components/VaultSelector";
import EmptyState from "@/components/ui/EmptyState";
import MetricCard from "@/components/ui/MetricCard";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
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
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import {
  getUserName,
  getVaultName,
  sourceMetrics,
  sources,
} from "@/lib/mock-data";
import type { SourceStatus, VaultId } from "@/types";

const statusFilterKeys = [
  "all",
  "imported",
  "validated",
  "toValidate",
] as const satisfies ("all" | SourceStatus)[];

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
        `${source.name} ${source.format} ${getUserName(source.addedByUserId)}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "all" || source.status === statusFilter;

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

          <PageHeader
            eyebrow={t("eyebrow", { vault: vaultName })}
            title={t("title")}
            description={t("subtitle")}
            actions={
              <button
                type="button"
                onClick={() => router.push(`/wiki/${params.vaultId}/contribute`)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-hoi-navy px-4 py-3 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
              >
                <FilePlus2 size={17} />
                {t("addSource")}
              </button>
            }
          />

          <div className="mb-6 flex justify-end">
            <VaultSelector
              value={params.vaultId as VaultId}
              label={tv("eyebrow")}
              onChange={(nextVaultId) => {
                router.push(`/wiki/${nextVaultId}/sources`);
              }}
            />
          </div>

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={<File size={20} />}
              value={format.number(sourceMetrics.total)}
              label={t("metrics.total")}
            />

            <MetricCard
              icon={<CheckCircle2 size={20} />}
              value={format.number(sourceMetrics.validated)}
              label={t("metrics.validated")}
            />

            <MetricCard
              icon={<Clock3 size={20} />}
              value={format.number(sourceMetrics.pending)}
              label={t("metrics.pending")}
            />
          </section>

          <section className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="mb-6 flex flex-col gap-3 lg:flex-row">
              <SearchInput
                containerClassName="flex-1"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("searchPlaceholder")}
              />

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
                            {source.format}
                          </span>

                          <span className="rounded-full bg-hoi-cream px-3 py-1">
                            {t(`categories.${source.category}`)}
                          </span>

                          <span className="rounded-full bg-hoi-cream px-3 py-1">
                            {formatSize(source.sizeBytes)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 text-sm lg:items-end">
                      <StatusBadge
                        tone={
                          source.status === "toValidate" ? "warning" : "success"
                        }
                        icon={
                          source.status === "toValidate" ? (
                            <Clock3 size={13} />
                          ) : (
                            <CheckCircle2 size={13} />
                          )
                        }
                      >
                        {t(`statuses.${source.status}`)}
                      </StatusBadge>

                      <p className="text-xs text-hoi-muted">
                        {t("addedBy", {
                          name: getUserName(source.addedByUserId),
                        })}
                      </p>

                      <p className="text-xs text-hoi-muted">
                        {format.dateTime(new Date(source.createdAt), {
                          dateStyle: "long",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredSources.length === 0 && <EmptyState title={t("empty")} />}
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
