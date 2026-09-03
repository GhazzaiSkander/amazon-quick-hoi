"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Database,
  FolderOpen,
  KeyRound,
  Search,
  ShieldCheck,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

type Vault = {
  id: string;
  name: string;
  description: string;
  category: string;
  documents: string;
  updated: string;
  color: string;
};

const vaults: Vault[] = [
  {
    id: "comptabilite-2026",
    name: "Comptabilité 2026",
    description:
      "Factures, avoirs, fournisseurs, clients et données financières.",
    category: "Finance",
    documents: "49 920 documents",
    updated: "Mis à jour aujourd’hui",
    color: "bg-blue-50 text-blue-700",
  },
  {
    id: "lin-ventes-2026",
    name: "LIN — Ventes 2026",
    description:
      "Ventes, produits, clients et informations commerciales de LIN.",
    category: "Commercial",
    documents: "12 480 documents",
    updated: "Mis à jour hier",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "prescription-nature",
    name: "Prescription Nature",
    description:
      "Référentiels produits, achats, ventes et connaissances opérationnelles.",
    category: "Entreprise",
    documents: "8 230 documents",
    updated: "Mis à jour il y a 3 jours",
    color: "bg-violet-50 text-violet-700",
  },
];

export default function WikiPage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const filteredVaults = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) {
      return vaults;
    }

    return vaults.filter((vault) =>
      `${vault.name} ${vault.description} ${vault.category}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  const selectedVault = vaults.find((vault) => vault.id === selectedId);

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-hoi-accent">
              Base de connaissances
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
              Wiki
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
              Choisissez un Vault pour consulter les pages, rechercher les
              données et travailler avec votre Assistant.
            </p>
          </header>

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            <SummaryCard
              icon={<Database size={20} />}
              value="3"
              label="Vaults accessibles"
            />

            <SummaryCard
              icon={<ShieldCheck size={20} />}
              value="100 %"
              label="Données protégées"
            />

            <SummaryCard
              icon={<KeyRound size={20} />}
              value="Lecture"
              label="Accès actuel"
            />
          </section>

          <section className="mb-8 rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-hoi-navy">
                  Vos Vaults
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  Sélectionnez le périmètre de données sur lequel vous
                  souhaitez travailler.
                </p>
              </div>

              <div className="relative w-full md:max-w-sm">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-hoi-muted"
                />

                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher un Vault..."
                  className="form-input w-full pl-10"
                />
              </div>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            {filteredVaults.map((vault) => {
              const isSelected = selectedId === vault.id;

              return (
                <button
                  key={vault.id}
                  type="button"
                  onClick={() => {
  setSelectedId(vault.id);
  router.push(`/wiki/${vault.id}`);
}}
                  className={`rounded-card border bg-hoi-surface p-5 text-left shadow-sm transition ${
                    isSelected
                      ? "border-hoi-accent ring-2 ring-hoi-accent/20"
                      : "border-hoi-border hover:-translate-y-0.5 hover:border-hoi-accent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`rounded-lg p-3 ${vault.color}`}>
                      <FolderOpen size={22} />
                    </div>

                    {isSelected && (
                      <span className="flex items-center gap-1 rounded-full bg-hoi-navy px-3 py-1 text-xs font-medium text-white">
                        <Check size={13} />
                        Sélectionné
                      </span>
                    )}
                  </div>

                  <p className="mt-5 text-xs font-medium uppercase tracking-wide text-hoi-muted">
                    {vault.category}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-hoi-navy">
                    {vault.name}
                  </h3>

                  <p className="mt-3 min-h-14 text-sm leading-6 text-hoi-muted">
                    {vault.description}
                  </p>

                  <div className="mt-5 border-t border-hoi-border pt-4">
                    <p className="text-sm font-medium text-hoi-navy">
                      {vault.documents}
                    </p>

                    <p className="mt-1 text-xs text-hoi-muted">
                      {vault.updated}
                    </p>
                  </div>
                </button>
              );
            })}
          </section>

          {filteredVaults.length === 0 && (
            <div className="rounded-card border border-dashed border-hoi-border p-12 text-center">
              <p className="font-medium text-hoi-navy">
                Aucun Vault trouvé
              </p>

              <p className="mt-2 text-sm text-hoi-muted">
                Essayez une autre recherche.
              </p>
            </div>
          )}

          <section className="mt-8 rounded-card border border-dashed border-hoi-border bg-white/40 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-3 text-hoi-navy">
                <Database size={20} />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-hoi-navy">
                  {selectedVault
                    ? `Vault sélectionné : ${selectedVault.name}`
                    : "Sélectionnez un Vault pour commencer"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-hoi-muted">
                  Après cette sélection, vous pourrez consulter les pages
                  Wiki, rechercher dans les données, voir les sources et
                  utiliser l’Assistant dans ce périmètre.
                </p>
              </div>

              <ArrowRight className="hidden text-hoi-muted sm:block" size={20} />
            </div>
          </section>

          <section className="mt-8 rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-3 text-hoi-navy">
                <KeyRound size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-hoi-navy">
                  Contexte personnel
                </h2>

                <p className="mt-1 text-sm leading-6 text-hoi-muted">
                  Vos fichiers personnels restent séparés des données de
                  l’entreprise. Ils pourront être ajoutés explicitement au
                  contexte de l’Assistant.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function SummaryCard({
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