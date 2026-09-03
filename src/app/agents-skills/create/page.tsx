import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Database,
  Info,
  Save,
  Shield,
  Wrench,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const toolKeys = [
  "readDocuments",
  "searchContext",
  "analyzeData",
  "useConnectors",
] as const;

const knowledgeKeys = ["personal", "company", "local"] as const;

export default function CreateAgentPage() {
  const t = useTranslations("agentCreate");
  const tc = useTranslations("common");

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/agents-skills"
            className="inline-flex items-center gap-2 text-sm font-medium text-hoi-muted transition hover:text-hoi-navy"
          >
            <ChevronLeft size={17} className="rtl-flip" />
            {t("back")}
          </Link>

          <header className="mt-6 border-b border-hoi-border pb-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <Bot size={25} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hoi-muted">
                  {t("eyebrow")}
                </p>

                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-hoi-navy">
                  {t("title")}
                </h1>

                <p className="mt-2 max-w-2xl text-base leading-7 text-hoi-muted">
                  {t("subtitle")}
                </p>
              </div>
            </div>
          </header>

          <div className="mt-6 space-y-6">
            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <SectionHeader
                icon={<Bot size={20} />}
                title={t("general.title")}
                description={t("general.description")}
              />

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <FormField label={t("general.nameLabel")}>
                  <input
                    type="text"
                    placeholder={t("general.namePlaceholder")}
                    className="form-input"
                  />
                </FormField>

                <FormField label={tc("visibility")}>
                  <select className="form-input" defaultValue="private">
                    <option value="private">{tc("visibilityPrivate")}</option>
                    <option value="workspace">
                      {tc("visibilityWorkspace")}
                    </option>
                    <option value="shared">{tc("visibilityShared")}</option>
                  </select>
                </FormField>

                <div className="md:col-span-2">
                  <FormField label={tc("description")}>
                    <input
                      type="text"
                      placeholder={t("general.descriptionPlaceholder")}
                      className="form-input"
                    />
                  </FormField>
                </div>
              </div>
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <SectionHeader
                icon={<Info size={20} />}
                title={t("instructions.title")}
                description={t("instructions.description")}
              />

              <textarea
                placeholder={t("instructions.placeholder")}
                className="mt-6 min-h-52 w-full resize-y rounded-xl border border-hoi-border bg-white p-4 text-sm leading-6 text-hoi-navy outline-none placeholder:text-hoi-muted/60 focus:border-hoi-navy"
              />
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <SectionHeader
                icon={<Database size={20} />}
                title={t("knowledge.title")}
                description={t("knowledge.description")}
              />

              <div className="mt-6 space-y-3">
                {knowledgeKeys.map((key, index) => (
                  <PermissionRow
                    key={key}
                    title={t(`knowledge.${key}.title`)}
                    description={t(`knowledge.${key}.description`)}
                    enabled={index < 2}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <SectionHeader
                icon={<Wrench size={20} />}
                title={t("tools.title")}
                description={t("tools.description")}
              />

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {toolKeys.map((tool, index) => (
                  <label
                    key={tool}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-hoi-border bg-white p-4"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={index < 2}
                      className="h-4 w-4 accent-[#172b4d]"
                    />

                    <span className="text-sm font-medium text-hoi-navy">
                      {t(`tools.${tool}`)}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-hoi-border bg-hoi-cream/50 p-4">
                <Shield size={18} className="mt-0.5 shrink-0 text-hoi-navy" />

                <p className="text-sm leading-6 text-hoi-muted">
                  {t("tools.notice")}
                </p>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hoi-border pt-6">
              <Link
                href="/agents-skills"
                className="rounded-lg border border-hoi-border bg-white px-5 py-3 text-sm font-medium text-hoi-muted transition hover:border-hoi-navy hover:text-hoi-navy"
              >
                {tc("cancel")}
              </Link>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg border border-hoi-border bg-white px-5 py-3 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
                >
                  <Save size={17} />
                  {tc("saveDraft")}
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-hoi-navy px-5 py-3 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
                >
                  {tc("continue")}
                  <ChevronRight size={17} className="rtl-flip" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-hoi-cream p-2.5 text-hoi-navy">{icon}</div>

      <div>
        <h2 className="font-semibold text-hoi-navy">{title}</h2>
        <p className="mt-1 text-sm text-hoi-muted">{description}</p>
      </div>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-hoi-muted">
        {label}
      </span>

      {children}
    </label>
  );
}

function PermissionRow({
  title,
  description,
  enabled,
}: {
  title: string;
  description: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-hoi-border bg-white p-4">
      <div>
        <h3 className="text-sm font-medium text-hoi-navy">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-hoi-muted">{description}</p>
      </div>

      <div
        className={`relative h-6 w-11 shrink-0 rounded-full p-1 ${
          enabled ? "bg-hoi-navy" : "bg-hoi-border"
        }`}
      >
        <div
          className={`h-4 w-4 rounded-full bg-white transition ${
            enabled ? "ms-5" : "ms-0"
          }`}
        />
      </div>
    </div>
  );
}
