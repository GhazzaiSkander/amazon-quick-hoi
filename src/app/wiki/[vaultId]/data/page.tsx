"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import EmptyState from "@/components/ui/EmptyState";
import MetricCard from "@/components/ui/MetricCard";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Database,
  FileText,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { getVaultName } from "@/lib/vaults";

type InvoiceStatusKey = "paid" | "toVerify";

/**
 * Invoice records are business data: numbers, dates, amounts and third parties
 * stay verbatim. `statusKey` is the stable internal status; only its label is
 * translated. Amounts and dates are formatted per locale at render time.
 */
const invoices: {
  id: string;
  number: string;
  date: string;
  thirdParty: string;
  amount: number;
  currency: string;
  statusKey: InvoiceStatusKey;
  source: string;
}[] = [
  {
    id: "FA2515312",
    number: "FA2515312",
    date: "2026-01-08",
    thirdParty: "Vanhoeve Dylan",
    amount: 1245,
    currency: "EUR",
    statusKey: "paid",
    source: "account_move_2026.csv",
  },
  {
    id: "FA2514447",
    number: "FA2514447",
    date: "2026-01-16",
    thirdParty: "Lixxball",
    amount: 860.5,
    currency: "EUR",
    statusKey: "paid",
    source: "account_move_2026.csv",
  },
  {
    id: "FA2510110",
    number: "FA2510110",
    date: "2026-02-22",
    thirdParty: "Avenir Énergie",
    amount: 3420,
    currency: "EUR",
    statusKey: "toVerify",
    source: "account_move_2026.csv",
  },
  {
    id: "FA2504135",
    number: "FA2504135",
    date: "2026-03-17",
    thirdParty: "Ciblex Express",
    amount: 2180.75,
    currency: "EUR",
    statusKey: "paid",
    source: "account_move_2026.csv",
  },
];

const statusFilterKeys = ["all", "paid", "toVerify"] as const;

const metrics = { records: 49920, invoices: 4238, toVerify: 12 };

export default function StructuredDataPage() {
  const params = useParams<{ vaultId: string }>();
  const t = useTranslations("data");
  const tc = useTranslations("common");
  const tv = useTranslations("vault");
  const format = useFormatter();

  const vaultName = getVaultName(params.vaultId, tv("fallbackName"));

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusFilterKeys)[number]>("all");

  const filteredInvoices = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return invoices.filter((invoice) => {
      const matchesQuery =
        !normalizedQuery ||
        `${invoice.number} ${invoice.thirdParty} ${invoice.source}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "all" || invoice.statusKey === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

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

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={<Database size={20} />}
              value={format.number(metrics.records)}
              label={t("metrics.records")}
            />

            <MetricCard
              icon={<FileText size={20} />}
              value={format.number(metrics.invoices)}
              label={t("metrics.invoices")}
            />

            <MetricCard
              icon={<CircleAlert size={20} />}
              value={format.number(metrics.toVerify)}
              label={t("metrics.toVerify")}
            />
          </section>

          <section className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-hoi-navy">
                  {t("invoicesTitle")}
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  {t("invoicesDescription")}
                </p>
              </div>

              <span className="text-sm text-hoi-muted">
                {tc("results", { count: filteredInvoices.length })}
              </span>
            </div>

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
                className="form-input lg:w-48"
              >
                {statusFilterKeys.map((key) => (
                  <option key={key} value={key}>
                    {t(`statuses.${key}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto rounded-xl border border-hoi-border">
              <table className="w-full min-w-[760px] text-start text-sm">
                <thead className="bg-hoi-cream text-xs uppercase tracking-wide text-hoi-muted">
                  <tr>
                    <th className="px-4 py-3 text-start font-semibold">
                      {t("columns.number")}
                    </th>
                    <th className="px-4 py-3 text-start font-semibold">
                      {t("columns.date")}
                    </th>
                    <th className="px-4 py-3 text-start font-semibold">
                      {t("columns.thirdParty")}
                    </th>
                    <th className="px-4 py-3 text-start font-semibold">
                      {t("columns.amount")}
                    </th>
                    <th className="px-4 py-3 text-start font-semibold">
                      {t("columns.status")}
                    </th>
                    <th className="px-4 py-3 text-start font-semibold">
                      {t("columns.source")}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-hoi-border">
                  {filteredInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="transition hover:bg-hoi-cream/50"
                    >
                      <td className="px-4 py-4 font-medium text-hoi-navy">
                        {invoice.number}
                      </td>

                      <td className="px-4 py-4 text-hoi-muted">
                        {format.dateTime(new Date(invoice.date), {
                          dateStyle: "medium",
                        })}
                      </td>

                      <td className="px-4 py-4 text-hoi-navy">
                        {invoice.thirdParty}
                      </td>

                      <td className="px-4 py-4 font-medium text-hoi-navy">
                        {format.number(invoice.amount, {
                          style: "currency",
                          currency: invoice.currency,
                        })}
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge
                          tone={
                            invoice.statusKey === "paid" ? "success" : "warning"
                          }
                          icon={
                            invoice.statusKey === "paid" ? (
                              <CheckCircle2 size={13} />
                            ) : (
                              <CircleAlert size={13} />
                            )
                          }
                        >
                          {t(`statuses.${invoice.statusKey}`)}
                        </StatusBadge>
                      </td>

                      <td className="px-4 py-4 text-xs text-hoi-muted">
                        {invoice.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredInvoices.length === 0 && (
              <EmptyState title={t("empty")} />
            )}
          </section>
        </div>
      </div>
    </AppShell>
  );
}
