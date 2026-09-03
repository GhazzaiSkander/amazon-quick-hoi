"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  File,
  FilePlus2,
  FolderOpen,
  Search,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const sources = [
  {
    id: "account-move-2026",
    name: "account_move_2026.csv",
    type: "CSV",
    category: "Finance",
    size: "202 MB",
    addedBy: "Skander",
    date: "03 septembre 2026",
    status: "Importé",
    description: "Écritures comptables et factures de l’année 2026.",
  },
  {
    id: "account-move-reference",
    name: "account_move_reference.xlsx",
    type: "Excel",
    category: "Référentiel",
    size: "14 MB",
    addedBy: "Sabri",
    date: "01 septembre 2026",
    status: "Validé",
    description: "Référentiel des articles et catégories de produits.",
  },
  {
    id: "process-onboarding",
    name: "process_onboarding.pdf",
    type: "PDF",
    category: "Processus",
    size: "2,4 MB",
    addedBy: "Camille",
    date: "30 août 2026",
    status: "À valider",
    description: "Documentation du processus d’onboarding.",
  },
];

const vaultNames: Record<string, string> = {
  "comptabilite-2026": "Comptabilité 2026",
  "lin-ventes-2026": "LIN — Ventes 2026",
  "prescription-nature": "Prescription Nature",
};

export default function SourcesPage() {
  const params = useParams<{ vaultId: string }>();
  const router = useRouter();
  const vaultName = vaultNames[params.vaultId] ?? "Vault";

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous les statuts");

  const filteredSources = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return sources.filter((source) => {
      const matchesQuery =
        !normalizedQuery ||
        `${source.name} ${source.type} ${source.category} ${source.addedBy}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "Tous les statuts" ||
        source.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href={`/wiki/${params.vaultId}`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-hoi-muted hover:text-hoi-navy"
          >
            <ArrowLeft size={16} />
            Retour à {vaultName}
          </Link>

          <header className="mb-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-hoi-accent">
                  Sources du Vault · {vaultName}
                </p>

                <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
                  Sources
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
                  Consultez les fichiers qui alimentent les pages Wiki et les
                  données structurées de ce Vault.
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push(`/wiki/${params.vaultId}/contribute`)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-hoi-navy px-4 py-3 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
              >
                <FilePlus2 size={17} />
                Ajouter une source
              </button>
            </div>
          </header>

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={<File size={20} />}
              value="248"
              label="Sources dans ce Vault"
            />

            <MetricCard
              icon={<CheckCircle2 size={20} />}
              value="236"
              label="Sources validées"
            />

            <MetricCard
              icon={<Clock3 size={20} />}
              value="12"
              label="En attente de validation"
            />
          </section>

          <section className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="mb-6 flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-hoi-muted"
                />

                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher une source..."
                  className="form-input w-full pl-10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="form-input lg:w-52"
              >
                <option>Tous les statuts</option>
                <option>Importé</option>
                <option>Validé</option>
                <option>À valider</option>
              </select>
            </div>

            <div className="space-y-3">
              {filteredSources.map((source) => (
                <div
                  key={source.id}
                  className="rounded-xl border border-hoi-border p-5 transition hover:border-hoi-accent"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-hoi-cream p-3 text-hoi-navy">
                        <File size={21} />
                      </div>

                      <div>
                        <h2 className="font-semibold text-hoi-navy">
                          {source.name}
                        </h2>

                        <p className="mt-1 text-sm text-hoi-muted">
                          {source.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-hoi-muted">
                          <span className="rounded-full bg-hoi-cream px-3 py-1">
                            {source.type}
                          </span>

                          <span className="rounded-full bg-hoi-cream px-3 py-1">
                            {source.category}
                          </span>

                          <span className="rounded-full bg-hoi-cream px-3 py-1">
                            {source.size}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 text-sm lg:items-end">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                          source.status === "À valider"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {source.status === "À valider" ? (
                          <Clock3 size={13} />
                        ) : (
                          <CheckCircle2 size={13} />
                        )}

                        {source.status}
                      </span>

                      <p className="text-xs text-hoi-muted">
                        Ajouté par {source.addedBy}
                      </p>

                      <p className="text-xs text-hoi-muted">{source.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredSources.length === 0 && (
              <div className="py-12 text-center text-sm text-hoi-muted">
                Aucune source ne correspond à votre recherche.
              </div>
            )}
          </section>

          <section className="mt-8 rounded-card border border-dashed border-hoi-border bg-white/40 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-3 text-hoi-navy">
                <FolderOpen size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-hoi-navy">
                  Importer un dossier complet
                </h2>

                <p className="mt-2 text-sm leading-6 text-hoi-muted">
                  Vous pourrez importer plusieurs fichiers en une seule fois.
                  Chaque fichier sera conservé comme source indépendante et
                  suivi dans le processus d’ingestion.
                </p>
              </div>
            </div>
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