import {
  AlertTriangle,
  Brain,
  Database,
  Network,
  Plus,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const stats = [
  {
    value: "0",
    label: "espaces d’entreprise lisibles",
    description:
      "Les espaces partagés restent en lecture seule dans votre contexte.",
    icon: <Database size={20} />,
  },
  {
    value: "0",
    label: "éléments privés",
    description:
      "Vos fichiers personnels restent privés par défaut.",
    icon: <Brain size={20} />,
  },
  {
    value: "0",
    label: "nœuds du graphe accessibles",
    description:
      "Les entités personnelles et partagées alimentent le contexte.",
    icon: <Network size={20} />,
  },
  {
    value: "3",
    label: "lacunes de connaissance",
    description:
      "Les éléments nécessitant davantage de contexte apparaîtront ici.",
    icon: <AlertTriangle size={20} />,
  },
];

export default function MyContextPage() {
  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="border-b border-hoi-border pb-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <Network size={24} />
              </div>

              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
                  Mon contexte
                </h1>

                <p className="mt-2 max-w-3xl text-base leading-7 text-hoi-muted">
                  Votre couche de connaissances privée, enrichie par les
                  informations d’entreprise auxquelles vous avez accès.
                </p>
              </div>
            </div>

            <nav className="mt-8 flex flex-wrap gap-8">
              <button
                type="button"
                className="border-b-2 border-hoi-navy pb-3 text-sm font-medium text-hoi-navy"
              >
                Accueil des connaissances
              </button>

              <button
                type="button"
                className="border-b-2 border-transparent pb-3 text-sm font-medium text-hoi-muted transition hover:text-hoi-navy"
              >
                Graphe de connaissances
              </button>

              <button
                type="button"
                className="border-b-2 border-transparent pb-3 text-sm font-medium text-hoi-muted transition hover:text-hoi-navy"
              >
                Mémoire
              </button>
            </nav>
          </header>

          <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-semibold text-hoi-navy">
                    {stat.value}
                  </span>

                  <div className="rounded-lg bg-hoi-cream p-2 text-hoi-navy">
                    {stat.icon}
                  </div>
                </div>

                <h2 className="mt-4 font-medium text-hoi-navy">
                  {stat.label}
                </h2>

                <p className="mt-2 text-sm leading-6 text-hoi-muted">
                  {stat.description}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-hoi-navy">
                  Votre base personnelle
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  Les éléments ajoutés ici restent privés par défaut.
                </p>
              </div>

              <span className="text-sm text-hoi-muted">
                Privé par défaut · Partage manuel
              </span>
            </div>

            <div className="mt-5 flex min-h-32 items-center justify-center rounded-xl border border-dashed border-hoi-border bg-white/60 p-6 text-center">
              <p className="text-sm text-hoi-muted">
                Aucune source personnelle n’a encore été ajoutée.
              </p>
            </div>

            <button
              type="button"
              className="mt-5 flex items-center gap-2 rounded-lg bg-hoi-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
            >
              <Plus size={17} />
              Ajouter une source
            </button>
          </section>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-hoi-navy">
                  Exclusions d’ingestion
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  Excluez les éléments que vous ne souhaitez jamais importer
                  dans votre contexte.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-[220px_1fr_auto]">
              <select
                defaultValue="sender-domain"
                className="rounded-lg border border-hoi-border bg-white px-4 py-3 text-sm text-hoi-navy outline-none focus:border-hoi-navy"
              >
                <option value="sender-domain">Domaine de l’expéditeur</option>
                <option value="file-pattern">Motif de fichier</option>
                <option value="folder">Dossier</option>
              </select>

              <input
                type="text"
                placeholder="Ex. *.interne.com"
                className="rounded-lg border border-hoi-border bg-white px-4 py-3 text-sm text-hoi-navy outline-none placeholder:text-hoi-muted/60 focus:border-hoi-navy"
              />

              <button
                type="button"
                className="rounded-lg bg-hoi-navy px-5 py-3 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
              >
                Ajouter la règle
              </button>
            </div>

            <p className="mt-4 text-sm text-hoi-muted">
              Aucune règle d’exclusion configurée.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}