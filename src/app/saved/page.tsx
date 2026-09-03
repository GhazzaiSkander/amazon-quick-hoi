import {
  Archive,
  FileText,
  FolderPlus,
  Grid2X2,
  List,
  Search,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

export default function SavedPage() {
  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="border-b border-hoi-border pb-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <Archive size={24} />
              </div>

              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
                  Mes éléments enregistrés
                </h1>

                <p className="mt-2 text-base leading-7 text-hoi-muted">
                  Retrouvez vos réponses, brouillons et ressources réutilisables
                  au même endroit.
                </p>
              </div>
            </div>

            <nav className="mt-8 flex gap-8">
              <button
                type="button"
                className="border-b-2 border-hoi-navy pb-3 text-sm font-medium text-hoi-navy"
              >
                Réponses enregistrées
              </button>

              <button
                type="button"
                className="border-b-2 border-transparent pb-3 text-sm font-medium text-hoi-muted transition hover:text-hoi-navy"
              >
                Ressources
              </button>
            </nav>
          </header>

          <section className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex min-w-64 flex-1 items-center gap-3 rounded-lg border border-hoi-border bg-hoi-surface px-4 py-3">
                <Search size={18} className="text-hoi-muted" />

                <input
                  type="search"
                  placeholder="Rechercher dans vos éléments enregistrés..."
                  className="w-full bg-transparent text-sm text-hoi-navy outline-none placeholder:text-hoi-muted/60"
                />
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-hoi-border bg-hoi-surface px-4 py-3 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
              >
                <FolderPlus size={17} />
                Nouveau dossier
              </button>

              <button
                type="button"
                aria-label="Affichage en liste"
                className="rounded-lg border border-hoi-border bg-hoi-surface p-3 text-hoi-muted transition hover:text-hoi-navy"
              >
                <List size={18} />
              </button>

              <button
                type="button"
                aria-label="Affichage en grille"
                className="rounded-lg bg-hoi-navy p-3 text-white"
              >
                <Grid2X2 size={18} />
              </button>
            </div>

            <button
              type="button"
              className="mt-5 rounded-full border border-hoi-navy bg-white px-4 py-2 text-sm font-medium text-hoi-navy"
            >
              Tous
            </button>
          </section>

          <section className="mt-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-hoi-muted">
              Vos réponses enregistrées
            </h2>

            <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
              <div className="flex min-h-80 items-center justify-center rounded-card border border-dashed border-hoi-border bg-hoi-surface p-10 text-center">
                <div>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-hoi-cream text-hoi-navy">
                    <Archive size={24} />
                  </div>

                  <h3 className="mt-5 font-semibold text-hoi-navy">
                    Aucun élément enregistré
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-hoi-muted">
                    Enregistrez une réponse depuis le chat pour commencer votre
                    collection.
                  </p>
                </div>
              </div>

              <div className="flex min-h-80 items-center justify-center rounded-card border border-hoi-border bg-hoi-surface p-8 text-center shadow-sm">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-hoi-cream text-hoi-navy">
                    <FileText size={21} />
                  </div>

                  <h3 className="mt-4 font-semibold text-hoi-navy">
                    Ouvrir un élément enregistré
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-hoi-muted">
                    Sélectionnez une réponse ou un brouillon pour le prévisualiser
                    ici.
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