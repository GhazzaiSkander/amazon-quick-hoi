"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VaultSelector from "@/components/VaultSelector";
import EmptyState from "@/components/ui/EmptyState";
import MetricCard from "@/components/ui/MetricCard";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { useFormatter, useTranslations } from "next-intl";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileCheck2,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import {
  getSourceName,
  getUserName,
  getVaultName,
  reviewItems,
  reviewMetrics,
} from "@/lib/mock-data";
import type { ReviewItem, ReviewStatus, VaultId } from "@/types";

const statusFilterKeys = ["toReview", "validated", "all"] as const satisfies (
  | "all"
  | ReviewStatus
)[];

export default function ReviewPage() {
  const params = useParams<{ vaultId: string }>();
  const router = useRouter();
  const t = useTranslations("review");
  const tv = useTranslations("vault");
  const format = useFormatter();

  const vaultName = getVaultName(params.vaultId, tv("fallbackName"));

  const [statusFilter, setStatusFilter] =
    useState<(typeof statusFilterKeys)[number]>("toReview");

  const filteredItems = useMemo(() => {
    if (statusFilter === "all") {
      return reviewItems;
    }

    return reviewItems.filter((item) => item.status === statusFilter);
  }, [statusFilter]);

  /**
   * The fixtures carry an ISO timestamp plus a rendering hint, so "Today at
   * 09:42" stays stable whatever day the prototype is opened.
   */
  function formatSubmittedAt(item: ReviewItem) {
    const label = item.submittedAtLabel;

    if (label.kind === "todayAt") {
      return t("dates.todayAt", { time: label.time });
    }

    if (label.kind === "yesterdayAt") {
      return t("dates.yesterdayAt", { time: label.time });
    }

    return format.dateTime(new Date(item.submittedAt), { dateStyle: "long" });
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
          />

          <div className="mb-6 flex justify-end">
            <VaultSelector
              value={params.vaultId as VaultId}
              label={tv("eyebrow")}
              onChange={(nextVaultId) => {
                router.push(`/wiki/${nextVaultId}/review`);
              }}
            />
          </div>

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={<Clock3 size={20} />}
              value={format.number(reviewMetrics.toReview)}
              label={t("metrics.toReview")}
              tone="warning"
            />

            <MetricCard
              icon={<CheckCircle2 size={20} />}
              value={format.number(reviewMetrics.validatedThisWeek)}
              label={t("metrics.validatedThisWeek")}
              tone="success"
            />

            <MetricCard
              icon={<UserCircle2 size={20} />}
              value={format.number(reviewMetrics.contributors)}
              label={t("metrics.contributors")}
              tone="info"
            />
          </section>

          <section className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-hoi-navy">
                  {t("queueTitle")}
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  {t("queueDescription")}
                </p>
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as (typeof statusFilterKeys)[number],
                  )
                }
                className="form-input md:w-48"
              >
                {statusFilterKeys.map((key) => (
                  <option key={key} value={key}>
                    {t(`statuses.${key}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-hoi-border p-5 transition hover:border-hoi-accent"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`rounded-lg p-3 ${
                          item.status === "validated"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.status === "validated" ? (
                          <CheckCircle2 size={21} />
                        ) : (
                          <AlertTriangle size={21} />
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-hoi-navy">
                            {t(`items.${item.id}.title`)}
                          </h3>

                          <span className="rounded-full bg-hoi-cream px-3 py-1 text-xs text-hoi-muted">
                            {t(`types.${item.type}`)}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-hoi-muted">
                          {t(`items.${item.id}.description`)}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-hoi-muted">
                          <span>
                            {t("sourceLabel", {
                              source: getSourceName(item.sourceId),
                            })}
                          </span>
                          <span>
                            {t("authorLabel", {
                              author: getUserName(item.submittedByUserId),
                            })}
                          </span>
                          <span>{formatSubmittedAt(item)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                      <StatusBadge
                        tone={
                          item.status === "validated" ? "success" : "warning"
                        }
                      >
                        {t(`statuses.${item.status}`)}
                      </StatusBadge>

                      <span className="text-xs text-hoi-muted">
                        {t(`confidence.${item.confidence}`)}
                      </span>

                      <Link
                        href={`/wiki/${params.vaultId}/review/${item.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-hoi-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
                      >
                        <FileCheck2 size={16} />
                        {t("examine")}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && <EmptyState title={t("empty")} />}
          </section>

          <section className="mt-8 rounded-card border border-dashed border-hoi-border bg-white/40 p-6">
            <h2 className="font-semibold text-hoi-navy">{t("ruleTitle")}</h2>

            <p className="mt-2 text-sm leading-6 text-hoi-muted">
              {t("ruleDescription")}
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
