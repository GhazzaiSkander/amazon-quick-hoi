import type { ReactNode } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Building2, Check, ChevronRight, Rocket, Users } from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const stepKeys = [
  "basics",
  "organisation",
  "tools",
  "priorities",
  "invites",
  "launch",
] as const;

const industryKeys = [
  "professionalServices",
  "technology",
  "finance",
  "marketing",
  "hr",
  "other",
] as const;

/** Size brackets are numeric data; only the "more than" wording is translated. */
const sizeBrackets: [number, number][] = [
  [1, 10],
  [11, 50],
  [51, 250],
  [251, 1000],
];
const sizeOverflow = 1000;

/** Business-model codes stay stable; two of them need a translated label. */
const businessModelCodes = ["B2B", "B2C", "B2B2C"] as const;

const growthStageKeys = [
  "founding",
  "launch",
  "scaleUp",
  "maturity",
  "transformation",
] as const;

const customerTypeKeys = [
  "startups",
  "sme",
  "midMarket",
  "enterprise",
  "consumer",
] as const;

const infoCardKeys = ["multiUser", "configurable", "companyContext"] as const;
const infoCardIcons = {
  multiUser: <Users size={19} />,
  configurable: <Rocket size={19} />,
  companyContext: <Building2 size={19} />,
} as const;

export default function SetupPage() {
  const t = useTranslations("setup");
  const tc = useTranslations("common");
  const format = useFormatter();

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <section className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-hoi-muted">
              {t("eyebrow")}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {stepKeys.map((stepKey, index) => {
                const active = index === 0;
                const completed = false;

                return (
                  <div key={stepKey} className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${
                        active
                          ? "border-hoi-navy bg-hoi-cream text-hoi-navy"
                          : "border-hoi-border bg-white text-hoi-muted"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                          active
                            ? "bg-hoi-navy text-white"
                            : "bg-hoi-cream text-hoi-muted"
                        }`}
                      >
                        {completed ? (
                          <Check size={13} />
                        ) : (
                          format.number(index + 1)
                        )}
                      </span>

                      <span className="hidden md:inline">
                        {t(`steps.${stepKey}`)}
                      </span>
                    </div>

                    {index < stepKeys.length - 1 && (
                      <ChevronRight
                        size={16}
                        className="rtl-flip text-hoi-border"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-7 shadow-sm lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-hoi-muted">
                  {t("stepIndicator", { current: 1, total: stepKeys.length })}
                </p>

                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-hoi-navy">
                  {t("title")}
                </h1>

                <p className="mt-3 max-w-3xl text-base leading-7 text-hoi-muted">
                  {t("subtitle")}
                </p>
              </div>

              <span className="rounded-full bg-hoi-cream px-4 py-2 text-sm font-medium text-hoi-navy">
                {t("draft")}
              </span>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <FormField label={t("fields.companyName")}>
                <input
                  type="text"
                  placeholder={t("fields.companyNamePlaceholder")}
                  className="form-input"
                />
              </FormField>

              <FormField label={t("fields.industry")}>
                <select className="form-input" defaultValue="">
                  <option value="" disabled>
                    {t("fields.industryPlaceholder")}
                  </option>
                  {industryKeys.map((key) => (
                    <option key={key} value={key}>
                      {t(`industries.${key}`)}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label={t("fields.subIndustry")}>
                <input
                  type="text"
                  placeholder={t("fields.subIndustryPlaceholder")}
                  className="form-input"
                />
              </FormField>

              <FormField label={t("fields.companySize")}>
                <select className="form-input" defaultValue="">
                  <option value="" disabled>
                    {t("fields.companySizePlaceholder")}
                  </option>
                  {sizeBrackets.map(([from, to]) => (
                    <option key={from} value={`${from}-${to}`}>
                      {`${format.number(from)}–${format.number(to)}`}
                    </option>
                  ))}
                  <option value={`${sizeOverflow}+`}>
                    {t("sizes.moreThan", {
                      count: format.number(sizeOverflow),
                    })}
                  </option>
                </select>
              </FormField>

              <FormField label={t("fields.businessModel")}>
                <select className="form-input" defaultValue="">
                  <option value="" disabled>
                    {t("fields.businessModelPlaceholder")}
                  </option>
                  {businessModelCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                  <option value="nonprofit">
                    {t("businessModels.nonprofit")}
                  </option>
                  <option value="other">{t("businessModels.other")}</option>
                </select>
              </FormField>

              <FormField label={t("fields.growthStage")}>
                <select className="form-input" defaultValue="">
                  <option value="" disabled>
                    {t("fields.growthStagePlaceholder")}
                  </option>
                  {growthStageKeys.map((key) => (
                    <option key={key} value={key}>
                      {t(`growthStages.${key}`)}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label={t("fields.customerType")}>
                <select className="form-input" defaultValue="">
                  <option value="" disabled>
                    {t("fields.customerTypePlaceholder")}
                  </option>
                  {customerTypeKeys.map((key) => (
                    <option key={key} value={key}>
                      {t(`customerTypes.${key}`)}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label={t("fields.region")}>
                <input
                  type="text"
                  placeholder={t("fields.regionPlaceholder")}
                  className="form-input"
                />
              </FormField>
            </div>

            <div className="mt-10 rounded-xl border border-hoi-border bg-hoi-cream/40 p-5">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-white p-2.5 text-hoi-navy">
                  <Building2 size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-hoi-navy">
                    {t("whyTitle")}
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-hoi-muted">
                    {t("whyDescription")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-hoi-border pt-6">
              <button
                type="button"
                className="rounded-lg border border-hoi-border bg-white px-5 py-3 text-sm font-medium text-hoi-muted transition hover:border-hoi-navy hover:text-hoi-navy"
              >
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
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-3">
            {infoCardKeys.map((key) => (
              <InfoCard
                key={key}
                icon={infoCardIcons[key]}
                title={t(`cards.${key}.title`)}
                description={t(`cards.${key}.description`)}
              />
            ))}
          </section>
        </div>
      </div>
    </AppShell>
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
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-hoi-muted">
        {label}
      </span>

      {children}
    </label>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hoi-cream text-hoi-navy">
        {icon}
      </div>

      <h2 className="mt-4 font-semibold text-hoi-navy">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-hoi-muted">{description}</p>
    </div>
  );
}
