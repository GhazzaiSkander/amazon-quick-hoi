import type { ReactNode } from "react";
import {
  ArrowUp,
  CalendarDays,
  FolderOpen,
  Mail,
  MessageCircle,
  Mic,
  Paperclip,
  Sparkles,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const suggestions = [
  "Résumer notre processus de lancement",
  "Préparer le briefing de la réunion de demain",
  "Analyser les dernières données commerciales",
  "Cartographier notre processus d’onboarding",
];

export default function Home() {
  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="mb-10">
            <p className="mb-3 text-sm font-medium text-hoi-muted">
              House of Ichigo · Workspace
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy lg:text-5xl">
              Sur quoi travaillons-nous aujourd’hui ?
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-hoi-muted">
              Interrogez vos connaissances, analysez vos données et utilisez
              vos outils professionnels depuis un espace unique.
            </p>
          </header>

          <section className="rounded-card border border-hoi-border bg-hoi-surface p-4 shadow-sm">
            <textarea
              placeholder="Posez une question..."
              className="min-h-28 w-full resize-none border-0 bg-transparent p-3 text-base text-hoi-navy outline-none placeholder:text-hoi-muted/60"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hoi-border pt-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Ajouter une pièce jointe"
                  className="rounded-lg p-2 text-hoi-muted transition hover:bg-hoi-cream hover:text-hoi-navy"
                >
                  <Paperclip size={18} />
                </button>

                <button
                  type="button"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-hoi-navy transition hover:bg-hoi-cream"
                >
                  Tous les outils
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-hoi-navy transition hover:bg-hoi-cream"
                >
                  <Sparkles size={16} />
                  Smart
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Utiliser le microphone"
                  className="rounded-lg p-2 text-hoi-muted transition hover:bg-hoi-cream hover:text-hoi-navy"
                >
                  <Mic size={18} />
                </button>

                <button
                  type="button"
                  aria-label="Envoyer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-hoi-navy text-white transition hover:bg-hoi-navy-soft"
                >
                  <ArrowUp size={18} />
                </button>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-hoi-navy">
                Suggestions
              </h2>

              <span className="text-sm text-hoi-muted">
                Démarrer rapidement
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="rounded-card border border-hoi-border bg-hoi-surface p-5 text-left text-sm font-medium text-hoi-navy shadow-sm transition hover:-translate-y-0.5 hover:border-hoi-accent"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="mb-4 text-lg font-semibold text-hoi-navy">
              Connecter vos outils
            </h2>

            <div className="grid gap-4 lg:grid-cols-3">
              <ConnectionCard
                icon={<FolderOpen size={20} />}
                title="Dossiers locaux"
                description="Autoriser la recherche dans vos fichiers."
                action="Ajouter un dossier"
              />

              <ConnectionCard
                icon={<Mail size={20} />}
                title="Email"
                description="Connecter Gmail ou Outlook."
                action="Connecter"
              />

              <ConnectionCard
                icon={<MessageCircle size={20} />}
                title="Messagerie"
                description="Connecter Slack ou Microsoft Teams."
                action="Connecter"
              />
            </div>
          </section>

          <section className="mt-10 rounded-card border border-dashed border-hoi-border bg-white/40 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-3 text-hoi-navy">
                <CalendarDays size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-hoi-navy">
                  Votre espace de travail
                </h2>

                <p className="mt-1 text-sm leading-6 text-hoi-muted">
                  Les connexions, agents et automatisations apparaîtront ici
                  au fur et à mesure de la configuration de votre espace.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function ConnectionCard({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-hoi-cream text-hoi-navy">
        {icon}
      </div>

      <h3 className="font-semibold text-hoi-navy">{title}</h3>

      <p className="mt-2 min-h-10 text-sm leading-5 text-hoi-muted">
        {description}
      </p>

      <button
        type="button"
        className="mt-5 rounded-lg bg-hoi-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
      >
        {action}
      </button>
    </div>
  );
}