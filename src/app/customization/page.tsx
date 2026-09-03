import {
  Bell,
  Check,
  Languages,
  ListChecks,
  Palette,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const themes = ["Système", "Clair", "Sombre", "Navy Paper", "Ink Dark"];

export default function CustomizationPage() {
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
                  Personnalisation
                </h1>

                <p className="mt-2 text-base leading-7 text-hoi-muted">
                  Personnalisez votre expérience House of Ichigo.
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
                  Apparence
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  Choisissez votre thème visuel préféré.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {themes.map((theme) => {
                const active = theme === "Navy Paper";

                return (
                  <button
                    key={theme}
                    type="button"
                    className={`flex items-center justify-between rounded-xl border px-4 py-4 text-sm font-medium transition ${
                      active
                        ? "border-hoi-navy bg-hoi-cream text-hoi-navy"
                        : "border-hoi-border bg-white text-hoi-navy hover:border-hoi-navy"
                    }`}
                  >
                    {theme}

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
                  Langue
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  Choisissez la langue de l’interface.
                </p>
              </div>
            </div>

            <div className="mt-6 max-w-md">
              <label
                htmlFor="language"
                className="mb-2 block text-sm font-medium text-hoi-navy"
              >
                Langue de l’application
              </label>

              <select
                id="language"
                defaultValue="fr"
                className="w-full rounded-lg border border-hoi-border bg-white px-4 py-3 text-sm text-hoi-navy outline-none focus:border-hoi-navy"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </section>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-2.5 text-hoi-navy">
                <Bell size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-hoi-navy">
                  Notifications
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  Contrôlez la manière dont les événements de votre espace
                  apparaissent.
                </p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-hoi-border">
              <NotificationRow
                title="Notifications dans l’application"
                description="Afficher les activités et mises à jour dans House of Ichigo."
                enabled
              />

              <NotificationRow
                title="Notifications du navigateur"
                description="Recevoir des notifications lorsque l’application est inactive."
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
                  Activity Feed
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  Choisissez les intégrations personnelles qui peuvent alimenter
                  votre fil d’activité.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <IntegrationRow
                title="Slack"
                description="Messagerie · connectez Slack pour activer cette option."
              />

              <IntegrationRow
                title="Microsoft Teams"
                description="Messagerie · connectez Teams pour activer cette option."
              />

              <IntegrationRow
                title="Gmail"
                description="Email · connectez Gmail pour activer cette option."
              />

              <IntegrationRow
                title="Outlook"
                description="Email · connectez Outlook pour activer cette option."
              />
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
            enabled ? "ml-5" : "ml-0"
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