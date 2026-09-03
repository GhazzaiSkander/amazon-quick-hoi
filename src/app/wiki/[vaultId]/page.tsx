import {
  ArrowLeft,
  Database,
  FileCheck2,
  FileText,
  FolderOpen,
  Search,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const vaultNames: Record<string, string> = {
  "comptabilite-2026": "Comptabilité 2026",
  "lin-ventes-2026": "LIN — Ventes 2026",
  "prescription-nature": "Prescription Nature",
};

export default async function VaultPage({
  params,
}: {
  params: Promise<{ vaultId: string }>;
}) {
  const { vaultId } = await params;
  const vaultName = vaultNames[vaultId] ?? "Vault inconnu";

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/wiki"
            className="mb-8 inline-flex items-center gap-2 text-sm text-hoi-muted transition hover:text-hoi-navy"
          >
            <ArrowLeft size={16} />
            Retour aux Vaults
          </Link>

          <header className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-hoi-accent">
              Vault sélectionné
            </p>

            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
                  {vaultName}
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
                  Consultez les connaissances, les sources et les données
                  structurées de ce Vault.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                <ShieldCheck size={16} />
                Accès autorisé
              </div>
            </div>
          </header>

          <section className="mb-8 rounded-card border border-hoi-border bg-hoi-surface p-4 shadow-sm">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-hoi-muted"
              />

              <input
                type="search"
                placeholder="Rechercher dans les pages, sources, tags et données..."
                className="form-input w-full pl-10"
              />
            </div>
          </section>

          <section className="mb-8 grid gap-4 md:grid-cols-4">
            <MetricCard
              icon={<FileText size={20} />}
              value="49 920"
              label="Pages et documents"
            />

            <MetricCard
              icon={<Database size={20} />}
              value="12 480"
              label="Données structurées"
            />

            <MetricCard
              icon={<FolderOpen size={20} />}
              value="248"
              label="Sources"
            />

            <MetricCard
              icon={<FileCheck2 size={20} />}
              value="12"
              label="À valider"
            />
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            <WorkspaceCard
              icon={<FileText size={22} />}
              title="Pages Wiki"
              description="Consulter les pages de connaissances et leurs métadonnées."
              action="Explorer les pages"
            />

            <WorkspaceCard
              icon={<Database size={22} />}
              title="Données structurées"
              description="Explorer les factures, produits, clients et autres données."
              action="Voir les données"
            />

            <WorkspaceCard
              icon={<FolderOpen size={22} />}
              title="Sources"
              description="Consulter les fichiers à l’origine des connaissances du Vault."
              action="Consulter les sources"
            />

            <WorkspaceCard
              icon={<FileCheck2 size={22} />}
              title="Validation humaine"
              description="Vérifier les changements proposés après une ingestion."
              action="Ouvrir la revue"
            />
          </section>

          <section className="mt-8 rounded-card border border-dashed border-hoi-border bg-white/40 p-6">
            <h2 className="font-semibold text-hoi-navy">
              Prochaine étape dans ce Vault
            </h2>

            <p className="mt-2 text-sm leading-6 text-hoi-muted">
              Après la sélection du Vault, l’utilisateur pourra rechercher,
              consulter, contribuer et valider les données dans ce même
              périmètre.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function MetricCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-hoi-cream text-hoi-navy">
        {icon}
      </div>

      <p className="text-2xl font-semibold text-hoi-navy">{value}</p>
      <p className="mt-1 text-sm text-hoi-muted">{label}</p>
    </div>
  );
}

function WorkspaceCard({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <button
      type="button"
      className="rounded-card border border-hoi-border bg-hoi-surface p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-hoi-accent"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-hoi-cream text-hoi-navy">
        {icon}
      </div>

      <h2 className="text-lg font-semibold text-hoi-navy">{title}</h2>

      <p className="mt-2 min-h-12 text-sm leading-6 text-hoi-muted">
        {description}
      </p>

      <p className="mt-5 text-sm font-medium text-hoi-accent">{action} →</p>
    </button>
  );
}