import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  LockKeyhole,
  Save,
  Server,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const toolKeys = [
  "read",
  "search",
  "createItems",
  "updateItems",
  "deleteItems",
] as const;

export default function CreateMcpServerPage() {
  const t = useTranslations("mcpCreate");
  const tc = useTranslations("common");

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/capabilities"
            className="inline-flex items-center gap-2 text-sm font-medium text-hoi-muted transition hover:text-hoi-navy"
          >
            <ChevronLeft size={17} className="rtl-flip" />
            {t("back")}
          </Link>

          <header className="mt-6 border-b border-hoi-border pb-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <Server size={25} />
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
                icon={<Server size={20} />}
                title={t("server.title")}
                description={t("server.description")}
              />

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <FormField label={t("server.nameLabel")}>
                  <input
                    type="text"
                    placeholder={t("server.namePlaceholder")}
                    className="form-input"
                  />
                </FormField>

                <FormField label={tc("visibility")}>
                  <select className="form-input" defaultValue="workspace">
                    <option value="private">{tc("visibilityPrivate")}</option>
                    <option value="workspace">
                      {t("server.visibilityWorkspace")}
                    </option>
                    <option value="selected">{tc("visibilityShared")}</option>
                  </select>
                </FormField>

                <FormField label={t("server.transportLabel")}>
                  <select className="form-input" defaultValue="streamable-http">
                    <option value="streamable-http">Streamable HTTP</option>
                    <option value="sse">SSE</option>
                    <option value="stdio">STDIO</option>
                  </select>
                </FormField>

                <FormField label={t("server.urlLabel")}>
                  <input
                    type="url"
                    placeholder="https://mcp.example.com"
                    className="form-input"
                  />
                </FormField>

                <div className="md:col-span-2">
                  <FormField label={tc("description")}>
                    <textarea
                      placeholder={t("server.descriptionPlaceholder")}
                      className="min-h-28 w-full resize-y rounded-xl border border-hoi-border bg-white p-4 text-sm leading-6 text-hoi-navy outline-none placeholder:text-hoi-muted/60 focus:border-hoi-navy"
                    />
                  </FormField>
                </div>
              </div>
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <SectionHeader
                icon={<LockKeyhole size={20} />}
                title={t("auth.title")}
                description={t("auth.description")}
              />

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <FormField label={t("auth.methodLabel")}>
                  <select className="form-input" defaultValue="bearer">
                    <option value="none">{t("auth.methodNone")}</option>
                    <option value="bearer">{t("auth.methodBearer")}</option>
                    <option value="oauth">{t("auth.methodOauth")}</option>
                    <option value="custom">{t("auth.methodCustom")}</option>
                  </select>
                </FormField>

                <FormField label={t("auth.secretNameLabel")}>
                  <input
                    type="text"
                    placeholder={t("auth.secretNamePlaceholder")}
                    className="form-input"
                  />
                </FormField>

                <div className="md:col-span-2">
                  <FormField label={t("auth.secretLabel")}>
                    <input
                      type="password"
                      placeholder={t("auth.secretPlaceholder")}
                      className="form-input"
                    />
                  </FormField>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-hoi-border bg-hoi-cream/50 p-4">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-hoi-navy"
                />

                <p className="text-sm leading-6 text-hoi-muted">
                  {t("auth.notice")}
                </p>
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

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-hoi-border bg-white p-4">
                <Info size={18} className="mt-0.5 shrink-0 text-hoi-navy" />

                <p className="text-sm leading-6 text-hoi-muted">
                  {t("tools.notice")}
                </p>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hoi-border pt-6">
              <Link
                href="/capabilities"
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
