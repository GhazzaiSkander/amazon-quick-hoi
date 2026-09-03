import type { ReactNode } from "react";
import Link from "next/link";
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

const toolOptions = [
  "Lire les données",
  "Rechercher",
  "Créer des éléments",
  "Modifier des éléments",
  "Supprimer des éléments",
];

export default function CreateMcpServerPage() {
  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/capabilities"
            className="inline-flex items-center gap-2 text-sm font-medium text-hoi-muted transition hover:text-hoi-navy"
          >
            <ChevronLeft size={17} />
            Retour aux capacités
          </Link>

          <header className="mt-6 border-b border-hoi-border pb-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <Server size={25} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hoi-muted">
                  Nouvelle connexion
                </p>

                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-hoi-navy">
                  Ajouter un serveur MCP
                </h1>

                <p className="mt-2 max-w-2xl text-base leading-7 text-hoi-muted">
                  Connectez un serveur MCP afin de rendre ses outils disponibles
                  pour vos agents avec des permissions contrôlées.
                </p>
              </div>
            </div>
          </header>

          <div className="mt-6 space-y-6">
            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <SectionHeader
                icon={<Server size={20} />}
                title="Informations du serveur"
                description="Définissez l’identité et le point de connexion du serveur MCP."
              />

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <FormField label="Nom du serveur">
                  <input
                    type="text"
                    placeholder="Ex. MCP Finance"
                    className="form-input"
                  />
                </FormField>

                <FormField label="Visibilité">
                  <select className="form-input" defaultValue="workspace">
                    <option value="private">Privé</option>
                    <option value="workspace">Espace de travail</option>
                    <option value="selected">Utilisateurs sélectionnés</option>
                  </select>
                </FormField>

                <FormField label="Type de transport">
                  <select className="form-input" defaultValue="streamable-http">
                    <option value="streamable-http">Streamable HTTP</option>
                    <option value="sse">SSE</option>
                    <option value="stdio">STDIO</option>
                  </select>
                </FormField>

                <FormField label="URL du serveur">
                  <input
                    type="url"
                    placeholder="https://mcp.example.com"
                    className="form-input"
                  />
                </FormField>

                <div className="md:col-span-2">
                  <FormField label="Description">
                    <textarea
                      placeholder="Décrivez les données et les outils proposés par ce serveur."
                      className="min-h-28 w-full resize-y rounded-xl border border-hoi-border bg-white p-4 text-sm leading-6 text-hoi-navy outline-none placeholder:text-hoi-muted/60 focus:border-hoi-navy"
                    />
                  </FormField>
                </div>
              </div>
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <SectionHeader
                icon={<LockKeyhole size={20} />}
                title="Authentification"
                description="Configurez la manière dont House of Ichigo s’authentifiera auprès du serveur."
              />

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <FormField label="Méthode d’authentification">
                  <select className="form-input" defaultValue="bearer">
                    <option value="none">Aucune authentification</option>
                    <option value="bearer">Bearer token</option>
                    <option value="oauth">OAuth 2.0</option>
                    <option value="custom">En-têtes personnalisés</option>
                  </select>
                </FormField>

                <FormField label="Nom du secret">
                  <input
                    type="text"
                    placeholder="Ex. MCP_FINANCE_TOKEN"
                    className="form-input"
                  />
                </FormField>

                <div className="md:col-span-2">
                  <FormField label="Secret ou token">
                    <input
                      type="password"
                      placeholder="Saisissez le secret de connexion"
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
                  Le secret ne devra jamais être exposé dans le frontend. Il
                  sera chiffré et utilisé uniquement par le serveur backend.
                </p>
              </div>
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <SectionHeader
                icon={<Wrench size={20} />}
                title="Outils autorisés"
                description="Choisissez les opérations que les agents pourront utiliser."
              />

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {toolOptions.map((tool, index) => (
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

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-hoi-border bg-white p-4">
                <Info
                  size={18}
                  className="mt-0.5 shrink-0 text-hoi-navy"
                />

                <p className="text-sm leading-6 text-hoi-muted">
                  Les permissions de modification et de suppression devront
                  être confirmées séparément par l’administrateur.
                </p>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hoi-border pt-6">
              <Link
                href="/capabilities"
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
  icon: ReactNode;
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