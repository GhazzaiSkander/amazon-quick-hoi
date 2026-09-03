import Link from "next/link";
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

const tools = [
  "Lire les documents",
  "Rechercher dans le contexte",
  "Analyser les données",
  "Utiliser les connecteurs",
];

export default function CreateAgentPage() {
  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/agents-skills"
            className="inline-flex items-center gap-2 text-sm font-medium text-hoi-muted transition hover:text-hoi-navy"
          >
            <ChevronLeft size={17} />
            Retour aux agents
          </Link>

          <header className="mt-6 border-b border-hoi-border pb-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <Bot size={25} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hoi-muted">
                  Nouveau configurateur
                </p>

                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-hoi-navy">
                  Créer un agent
                </h1>

                <p className="mt-2 max-w-2xl text-base leading-7 text-hoi-muted">
                  Définissez le rôle, les connaissances et les permissions de
                  votre assistant IA.
                </p>
              </div>
            </div>
          </header>

          <div className="mt-6 space-y-6">
            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <SectionHeader
                icon={<Bot size={20} />}
                title="Informations générales"
                description="Définissez l’identité et la mission de votre agent."
              />

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <FormField label="Nom de l’agent">
                  <input
                    type="text"
                    placeholder="Ex. Assistant commercial"
                    className="form-input"
                  />
                </FormField>

                <FormField label="Visibilité">
                  <select className="form-input" defaultValue="private">
                    <option value="private">Privé</option>
                    <option value="workspace">Tout l’espace de travail</option>
                    <option value="shared">Utilisateurs sélectionnés</option>
                  </select>
                </FormField>

                <div className="md:col-span-2">
                  <FormField label="Description">
                    <input
                      type="text"
                      placeholder="Décrivez brièvement ce que fait cet agent."
                      className="form-input"
                    />
                  </FormField>
                </div>
              </div>
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <SectionHeader
                icon={<Info size={20} />}
                title="Instructions de l’agent"
                description="Expliquez à l’agent comment il doit raisonner et répondre."
              />

              <textarea
                placeholder={`Exemple :

Tu es un assistant spécialisé dans l’analyse des processus internes.
Réponds de manière claire, structurée et concise.
Cite toujours les sources utilisées.
Si l’information n’est pas disponible, indique-le clairement.`}
                className="mt-6 min-h-52 w-full resize-y rounded-xl border border-hoi-border bg-white p-4 text-sm leading-6 text-hoi-navy outline-none placeholder:text-hoi-muted/60 focus:border-hoi-navy"
              />
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <SectionHeader
                icon={<Database size={20} />}
                title="Sources de connaissances"
                description="Choisissez les informations auxquelles cet agent pourra accéder."
              />

              <div className="mt-6 space-y-3">
                <PermissionRow
                  title="Contexte personnel"
                  description="Documents privés et sources personnelles de l’utilisateur."
                  enabled
                />

                <PermissionRow
                  title="Connaissances de l’entreprise"
                  description="Espaces partagés accessibles en lecture seule."
                  enabled
                />

                <PermissionRow
                  title="Dossiers locaux"
                  description="Fichiers locaux explicitement autorisés."
                  enabled={false}
                />
              </div>
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <SectionHeader
                icon={<Wrench size={20} />}
                title="Outils et capacités"
                description="Activez les outils que l’agent pourra utiliser."
              />

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {tools.map((tool, index) => (
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
                      {tool}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-hoi-border bg-hoi-cream/50 p-4">
                <Shield
                  size={18}
                  className="mt-0.5 shrink-0 text-hoi-navy"
                />

                <p className="text-sm leading-6 text-hoi-muted">
                  Les outils sensibles, notamment les serveurs MCP, devront
                  toujours être autorisés par une permission explicite.
                </p>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hoi-border pt-6">
              <Link
                href="/agents-skills"
                className="rounded-lg border border-hoi-border bg-white px-5 py-3 text-sm font-medium text-hoi-muted transition hover:border-hoi-navy hover:text-hoi-navy"
              >
                Annuler
              </Link>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg border border-hoi-border bg-white px-5 py-3 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy"
                >
                  <Save size={17} />
                  Enregistrer comme brouillon
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-hoi-navy px-5 py-3 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
                >
                  Continuer
                  <ChevronRight size={17} />
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
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-hoi-cream p-2.5 text-hoi-navy">
        {icon}
      </div>

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
  children: React.ReactNode;
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
            enabled ? "ml-5" : "ml-0"
          }`}
        />
      </div>
    </div>
  );
}