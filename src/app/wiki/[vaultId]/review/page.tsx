"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VaultSelector from "@/components/VaultSelector";
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
import { getVaultName, type VaultId } from "@/lib/vaults";

type ReviewStatusKey = "toReview" | "validated";
type ReviewTypeKey = "structuredData" | "wikiPage";
type ConfidenceKey = "high" | "medium" | "low" | "validated";

type ReviewDate =
  | { kind: "todayAt"; time: string }
  | { kind: "yesterdayAt"; time: string }
  | { kind: "absolute"; date: string };

/**
 * Review items are business data. Source filenames and author names stay
 * verbatim; status, type, confidence and the relative date are keyed.
 */
const reviewItems: {
  id: string;
  typeKey: ReviewTypeKey;
  source: string;
  author: string;
  date: ReviewDate;
  confidenceKey: ConfidenceKey;
  statusKey: ReviewStatusKey;
}[] = [
  {
    id: "review-1",
    typeKey: "structuredData",
    source: "account_move_2026.csv",
    author: "Skander",
    date: { kind: "todayAt", time: "09:42" },
    confidenceKey: "medium",
    statusKey: "toReview",
  },
  {
    id: "review-2",
    typeKey: "wikiPage",
    source: "account_move_reference.xlsx",
    author: "Sabri",
    date: { kind: "yesterdayAt", time: "16:20" },
    confidenceKey: "high",
    statusKey: "toReview",
  },
  {
    id: "review-3",
    typeKey: "wikiPage",
    source: "process_onboarding.pdf",
    author: "Camille",
    date: { kind: "absolute", date: "2026-08-30" },
    confidenceKey: "low",
    statusKey: "toReview",
  },
  {
    id: "review-4",
    typeKey: "structuredData",
    source: "account_move_2026.csv",
    author: "Skander",
    date: { kind: "absolute", date: "2026-08-29" },
    confidenceKey: "validated",
    statusKey: "validated",
  },
];

const statusFilterKeys = ["toReview", "validated", "all"] as const;

const metrics = { toReview: 12, validatedThisWeek: 48, contributors: 3 };

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

    return reviewItems.filter((item) => item.statusKey === statusFilter);
  }, [statusFilter]);

  function formatDate(date: ReviewDate) {
    if (date.kind === "todayAt") return t("dates.todayAt", { time: date.time });
    if (date.kind === "yesterdayAt")
      return t("dates.yesterdayAt", { time: date.time });

    return format.dateTime(new Date(date.date), { dateStyle: "long" });
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-hoi-accent">
              {t("eyebrow", { vault: vaultName })}
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
              {t("title")}
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
              {t("subtitle")}
            </p>
          </header>
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
              value={format.number(metrics.toReview)}
              label={t("metrics.toReview")}
              tone="amber"
            />

            <MetricCard
              icon={<CheckCircle2 size={20} />}
              value={format.number(metrics.validatedThisWeek)}
              label={t("metrics.validatedThisWeek")}
              tone="green"
            />

            <MetricCard
              icon={<UserCircle2 size={20} />}
              value={format.number(metrics.contributors)}
              label={t("metrics.contributors")}
              tone="blue"
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
                          item.statusKey === "validated"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.statusKey === "validated" ? (
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
                            {t(`types.${item.typeKey}`)}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-hoi-muted">
                          {t(`items.${item.id}.description`)}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-hoi-muted">
                          <span>{t("sourceLabel", { source: item.source })}</span>
                          <span>{t("authorLabel", { author: item.author })}</span>
                          <span>{formatDate(item.date)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.statusKey === "validated"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {t(`statuses.${item.statusKey}`)}
                      </span>

                      <span className="text-xs text-hoi-muted">
                        {t(`confidence.${item.confidenceKey}`)}
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

            {filteredItems.length === 0 && (
              <div className="py-12 text-center text-sm text-hoi-muted">
                {t("empty")}
              </div>
            )}
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

function MetricCard({
  icon,
  value,
  label,
  tone,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  tone: "amber" | "green" | "blue";
}) {
  const colors = {
    amber: "bg-amber-50 text-amber-700",
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
  };

  return (
    <div className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${colors[tone]}`}
      >
        {icon}
      </div>

      <p className="text-2xl font-semibold text-hoi-navy">{value}</p>
      <p className="mt-1 text-sm text-hoi-muted">{label}</p>
    </div>
  );
}
