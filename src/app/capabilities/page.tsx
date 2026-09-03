import {
  CalendarClock,
  ChevronDown,
  Globe2,
  Link2,
  Plus,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const tabs = [
  { label: "Connecteurs", icon: Link2 },
  { label: "Planifications", icon: CalendarClock },
  { label: "Outils", icon: Wrench },
  { label: "Serveurs MCP", icon: Server },
];

const connections = [
  {
    name: "Slack",
    description: "Messages, discussions et canaux en lecture contrôlée.",
  },
  {
    name: "Microsoft Teams",
    description: "Canaux, mentions et conversations professionnelles.",
  },
  {
    name: "Gmail",
    description: "Emails et informations de calendrier autorisés.",
  },
  {
    name: "Google Drive",
    description: "Documents et dossiers approuvés par l’utilisateur.",
  },
];

export default function CapabilitiesPage() {
  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="border-b border-hoi-border pb-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <Wrench size={24} />
              </div>

              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
                  Capacités
                </h1>

                <p className="mt-2 max-w-3xl text-base leading-7 text-hoi-muted">
                  Gérez les connecteurs, les planifications, les outils et les
                  serveurs MCP de votre espace de travail.
                </p>
              </div>
            </div>

            <nav className="mt-8 flex flex-wrap gap-8">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const active = index === 0;

                return (
                  <button
                    key={tab.label}
                    type="button"
                    className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition ${
                      active
                        ? "border-hoi-navy text-hoi-navy"
                        : "border-transparent text-hoi-muted hover:text-hoi-navy"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </header>

          <section className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex min-w-64 flex-1 items-center gap-3 rounded-lg border border-hoi-border bg-hoi-surface px-4 py-3">
                <Search size={18} className="text-hoi-muted" />

                <input
                  type="search"
                  placeholder="Rechercher un connecteur..."
                  className="w-full bg-transparent text-sm text-hoi-navy outline-none placeholder:text-hoi-muted/60"
                />
              </div>

              <button
                type="button"
                aria-label="Actualiser les connecteurs"
                className="rounded-lg border border-hoi-border bg-hoi-surface p-3 text-hoi-muted transition hover:text-hoi-navy"
              >
                <RefreshCw size={18} />
              </button>

              <button
                type="button"
                className="rounded-lg border border-hoi-border bg-hoi-surface px-4 py-3 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
              >
                Parcourir
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-hoi-navy px-4 py-3 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
              >
                <Plus size={17} />
                Créer
                <ChevronDown size={15} />
              </button>
            </div>
          </section>

          <section className="mt-8">
            <SectionTitle title="Connecteurs web" count="1" />

            <div className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                    <Globe2 size={22} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-hoi-navy">
                      Navigation web
                    </h2>

                    <p className="mt-1 text-sm text-hoi-muted">
                      Rechercher et consulter des pages publiques avec une
                      protection SSRF.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-hoi-cream px-3 py-1 text-xs font-medium text-hoi-muted">
                    Non configuré
                  </span>

                  <button
                    type="button"
                    className="rounded-lg border border-hoi-border bg-white px-4 py-2 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
                  >
                    Configurer
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <SectionTitle title="Serveurs MCP" count="0" />

            <div className="rounded-card border border-dashed border-hoi-border bg-hoi-surface p-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-hoi-cream text-hoi-navy">
                  <Server size={25} />
                </div>

                <h2 className="mt-5 font-semibold text-hoi-navy">
                  Aucun serveur MCP configuré
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-hoi-muted">
                  Les serveurs MCP permettront de connecter des outils
                  externes à vos agents avec des permissions contrôlées.
                </p>

                <button
                  type="button"
                  className="mt-5 flex items-center gap-2 rounded-lg bg-hoi-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
                >
                  <Plus size={17} />
                  Créer un serveur MCP
                </button>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <SectionTitle title="Nouvelles connexions" count="4" />

            <div className="mb-4 flex items-start gap-3 rounded-lg border border-hoi-border bg-hoi-cream/50 p-4">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-hoi-navy"
              />

              <p className="text-sm leading-6 text-hoi-muted">
                Les nouveaux connecteurs sont en lecture seule par défaut. Ils
                ne peuvent pas envoyer, modifier, supprimer ou publier des
                données sans permission explicite.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {connections.map((connection) => (
                <div
                  key={connection.name}
                  className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-semibold text-hoi-navy">
                        {connection.name}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-hoi-muted">
                        {connection.description}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-hoi-cream px-3 py-1 text-xs font-medium text-hoi-muted">
                      Non configuré
                    </span>
                  </div>

                  <button
                    type="button"
                    className="mt-5 rounded-lg border border-hoi-border bg-white px-4 py-2 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
                  >
                    Se connecter
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function SectionTitle({
  title,
  count,
}: {
  title: string;
  count: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-hoi-muted">
        {title}
      </h2>

      <span className="rounded-full bg-hoi-cream px-2 py-0.5 text-xs font-medium text-hoi-muted">
        {count}
      </span>
    </div>
  );
}