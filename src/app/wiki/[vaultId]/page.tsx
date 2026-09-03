import type { ReactNode } from "react";
import { getFormatter, getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  Database,
  FileCheck2,
  FileText,
  FolderOpen,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { getVaultName } from "@/lib/vaults";

const metrics = {
  pages: 49920,
  structuredData: 12480,
  sources: 248,
  toReview: 12,
};

export default async function VaultPage({
  params,
}: {
  params: Promise<{ vaultId: string }>;
}) {
  const { vaultId } = await params;
  const t = await getTranslations("vault");
  const format = await getFormatter();
  const vaultName = getVaultName(vaultId, t("unknown"));

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/wiki"
            className="mb-8 inline-flex items-center gap-2 text-sm text-hoi-muted transition hover:text-hoi-navy"
          >
            <ArrowLeft size={16} className="rtl-flip" />
            {t("back")}
          </Link>

          <header className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-hoi-accent">
              {t("eyebrow")}
            </p>

            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
                  {vaultName}
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
                  {t("subtitle")}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                <ShieldCheck size={16} />
                {t("accessGranted")}
              </div>
            </div>
          </header>

          <section className="mb-8 rounded-card border border-hoi-border bg-hoi-surface p-4 shadow-sm">
            <div className="relative">
              <Search
                size={18}
                className="absolute start-3 top-1/2 -translate-y-1/2 text-hoi-muted"
              />

              <input
                type="search"
                placeholder={t("searchPlaceholder")}
                className="form-input w-full ps-10"
              />
            </div>
          </section>

          <section className="mb-8 grid gap-4 md:grid-cols-4">
            <MetricCard
              icon={<FileText size={20} />}
              value={format.number(metrics.pages)}
              label={t("metrics.pages")}
            />

            <MetricCard
              icon={<Database size={20} />}
              value={format.number(metrics.structuredData)}
              label={t("metrics.structuredData")}
            />

            <MetricCard
              icon={<FolderOpen size={20} />}
              value={format.number(metrics.sources)}
              label={t("metrics.sources")}
            />

            <MetricCard
              icon={<FileCheck2 size={20} />}
              value={format.number(metrics.toReview)}
              label={t("metrics.toReview")}
            />
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            <WorkspaceCard
              href={`/wiki/${vaultId}/pages`}
              icon={<FileText size={22} />}
              title={t("cards.pages.title")}
              description={t("cards.pages.description")}
              action={t("cards.pages.action")}
            />

            <WorkspaceCard
              href={`/chat?vaultId=${vaultId}`}
              icon={<MessageCircle size={22} />}
              title={t("cards.assistant.title")}
              description={t("cards.assistant.description")}
              action={t("cards.assistant.action")}
            />

            <WorkspaceCard
              href={`/wiki/${vaultId}/data`}
              icon={<Database size={22} />}
              title={t("cards.data.title")}
              description={t("cards.data.description")}
              action={t("cards.data.action")}
            />

            <WorkspaceCard
              href={`/wiki/${vaultId}/sources`}
              icon={<FolderOpen size={22} />}
              title={t("cards.sources.title")}
              description={t("cards.sources.description")}
              action={t("cards.sources.action")}
            />

            <WorkspaceCard
              href={`/wiki/${vaultId}/search`}
              icon={<Search size={22} />}
              title={t("cards.search.title")}
              description={t("cards.search.description")}
              action={t("cards.search.action")}
            />

            <WorkspaceCard
              href={`/wiki/${vaultId}/review`}
              icon={<FileCheck2 size={22} />}
              title={t("cards.review.title")}
              description={t("cards.review.description")}
              action={t("cards.review.action")}
            />
          </section>

          <section className="mt-8 rounded-card border border-dashed border-hoi-border bg-white/40 p-6">
            <h2 className="font-semibold text-hoi-navy">
              {t("nextStepTitle")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-hoi-muted">
              {t("nextStepDescription")}
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
}: {
  icon: ReactNode;
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

function WorkspaceCard({
  href,
  icon,
  title,
  description,
  action,
}: {
  href?: string;
  icon: ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  const content = (
    <>
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-hoi-cream text-hoi-navy">
        {icon}
      </div>

      <h2 className="text-lg font-semibold text-hoi-navy">{title}</h2>

      <p className="mt-2 min-h-12 text-sm leading-6 text-hoi-muted">
        {description}
      </p>

      <p className="mt-5 text-sm font-medium text-hoi-accent">
        {action}{" "}
        <span aria-hidden className="rtl-flip inline-block">
          →
        </span>
      </p>
    </>
  );

  const className =
    "block rounded-card border border-hoi-border bg-hoi-surface p-6 text-start shadow-sm transition hover:-translate-y-0.5 hover:border-hoi-accent";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
