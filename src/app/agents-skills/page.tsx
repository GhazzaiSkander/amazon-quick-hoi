import {
  Bot,
  Grid2X2,
  List,
  Plus,
  Search,
  Sparkles,
  Store,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const tabs = [
  { label: "Agents", icon: Bot },
  { label: "Compétences", icon: Sparkles },
  { label: "Marketplace", icon: Store },
  { label: "Parcourir", icon: Search },
];

export default function AgentsSkillsPage() {
  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="border-b border-hoi-border pb-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <Bot size={24} />
              </div>

              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
                  Agents et compétences
                </h1>

                <p className="mt-2 max-w-3xl text-base leading-7 text-hoi-muted">
                  Les agents sont des coéquipiers IA qui travaillent pour vous.
                  Les compétences sont des procédures réutilisables qu’ils
                  suivent pour accomplir une tâche de manière cohérente.
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
                  placeholder="Rechercher un agent..."
                  className="w-full bg-transparent text-sm text-hoi-navy outline-none placeholder:text-hoi-muted/60"
                />
              </div>

              <button
                type="button"
                className="rounded-lg border border-hoi-border bg-hoi-surface p-3 text-hoi-muted transition hover:text-hoi-navy"
                aria-label="Affichage en grille"
              >
                <Grid2X2 size={18} />
              </button>

              <button
                type="button"
                className="rounded-lg border border-hoi-border bg-hoi-surface p-3 text-hoi-muted transition hover:text-hoi-navy"
                aria-label="Affichage en liste"
              >
                <List size={18} />
              </button>

              <button
                type="button"
                className="rounded-lg border border-hoi-border bg-hoi-surface px-4 py-3 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
              >
                Parcourir
              </button>

             <Link
  href="/agents-skills/create"
  className="flex items-center gap-2 rounded-lg bg-hoi-navy px-4 py-3 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
>
  <Plus size={17} />
  Créer
</Link>

              <button
                type="button"
                className="rounded-lg border border-hoi-border bg-hoi-surface px-4 py-3 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
              >
                Créer depuis le chat
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Tous", "Récents", "Favoris", "Partagés"].map(
                (filter, index) => (
                  <button
                    key={filter}
                    type="button"
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      index === 0
                        ? "border-hoi-navy bg-white text-hoi-navy"
                        : "border-hoi-border bg-hoi-surface text-hoi-muted hover:text-hoi-navy"
                    }`}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="flex min-h-80 items-center justify-center rounded-card border border-dashed border-hoi-border bg-hoi-surface p-10 text-center">
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-hoi-cream text-hoi-navy">
                  <Bot size={25} />
                </div>

                <h2 className="mt-5 font-semibold text-hoi-navy">
                  Aucun agent trouvé
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-hoi-muted">
                  Créez votre premier agent depuis la bibliothèque, le chat ou
                  une configuration manuelle.
                </p>

                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-hoi-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
                >
                  <Plus size={17} />
                  Créer un agent
                </button>
              </div>
            </div>

            <div className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-hoi-cream text-hoi-navy">
                <WandSparkles size={21} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-hoi-navy">
                Construisez vos assistants
              </h2>

              <p className="mt-2 text-sm leading-6 text-hoi-muted">
                Chaque agent pourra avoir ses propres instructions, compétences,
                sources de connaissances et permissions.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-lg border border-hoi-border bg-white p-4">
                  <p className="text-sm font-medium text-hoi-navy">
                    Instructions personnalisées
                  </p>
                  <p className="mt-1 text-xs text-hoi-muted">
                    Définissez le rôle et le comportement de l’agent.
                  </p>
                </div>

                <div className="rounded-lg border border-hoi-border bg-white p-4">
                  <p className="text-sm font-medium text-hoi-navy">
                    Outils et permissions
                  </p>
                  <p className="mt-1 text-xs text-hoi-muted">
                    Contrôlez précisément les actions autorisées.
                  </p>
                </div>

                <div className="rounded-lg border border-hoi-border bg-white p-4">
                  <p className="text-sm font-medium text-hoi-navy">
                    Sources de connaissances
                  </p>
                  <p className="mt-1 text-xs text-hoi-muted">
                    Connectez les espaces lisibles par chaque agent.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}