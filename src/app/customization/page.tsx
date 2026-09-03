import { useTranslations } from "next-intl";
import { Bell, Check, Languages, ListChecks, Palette } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import LanguageSelector from "@/components/LanguageSelector";

const themeKeys = ["system", "light", "dark", "navyPaper", "inkDark"] as const;
const activeTheme = "navyPaper";

const integrationKeys = ["slack", "teams", "gmail", "outlook"] as const;

/** Integration display names are product names, not UI copy. */
const integrationNames: Record<(typeof integrationKeys)[number], string> = {
  slack: "Slack",
  teams: "Microsoft Teams",
  gmail: "Gmail",
  outlook: "Outlook",
};

export default function CustomizationPage() {
  const t = useTranslations("customization");

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <header className="border-b border-hoi-border pb-8">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <ListChecks size={24} />
              </div>

              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
                  {t("title")}
                </h1>

                <p className="mt-2 text-base leading-7 text-hoi-muted">
                  {t("subtitle")}
                </p>
              </div>
            </div>
          </header>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-2.5 text-hoi-navy">
                <Palette size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-hoi-navy">
                  {t("appearance.title")}
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  {t("appearance.description")}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {themeKeys.map((themeKey) => {
                const active = themeKey === activeTheme;

                return (
                  <button
                    key={themeKey}
                    type="button"
                    className={`flex items-center justify-between rounded-xl border px-4 py-4 text-sm font-medium transition ${
                      active
                        ? "border-hoi-navy bg-hoi-cream text-hoi-navy"
                        : "border-hoi-border bg-white text-hoi-navy hover:border-hoi-navy"
                    }`}
                  >
                    {t(`themes.${themeKey}`)}

                    {active && <Check size={17} />}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-2.5 text-hoi-navy">
                <Languages size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-hoi-navy">
                  {t("language.title")}
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  {t("language.description")}
                </p>
              </div>
            </div>

            <LanguageSelector />
          </section>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-2.5 text-hoi-navy">
                <Bell size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-hoi-navy">
                  {t("notifications.title")}
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  {t("notifications.description")}
                </p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-hoi-border">
              <NotificationRow
                title={t("notifications.inApp.title")}
                description={t("notifications.inApp.description")}
                enabled
              />

              <NotificationRow
                title={t("notifications.browser.title")}
                description={t("notifications.browser.description")}
                enabled={false}
              />
            </div>
          </section>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-2.5 text-hoi-navy">
                <ListChecks size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-hoi-navy">
                  {t("activityFeed.title")}
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  {t("activityFeed.description")}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {integrationKeys.map((key) => (
                <IntegrationRow
                  key={key}
                  title={integrationNames[key]}
                  description={t(`activityFeed.${key}`)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function NotificationRow({
  title,
  description,
  enabled,
}: {
  title: string;
  description: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <div>
        <h3 className="text-sm font-medium text-hoi-navy">{title}</h3>
        <p className="mt-1 text-sm text-hoi-muted">{description}</p>
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

function IntegrationRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-hoi-border bg-white p-4">
      <div>
        <h3 className="text-sm font-medium text-hoi-navy">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-hoi-muted">{description}</p>
      </div>

      <div className="h-6 w-11 rounded-full bg-hoi-border p-1">
        <div className="h-4 w-4 rounded-full bg-white" />
      </div>
    </div>
  );
}
