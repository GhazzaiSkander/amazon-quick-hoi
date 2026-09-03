"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Search,
  Tag,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const pages = [
  {
    id: "articles",
    title: "ARTICLES",
    type: "Catégorie",
    path: "wiki/entities/categories/articles.md",
    tags: ["produit", "référentiel"],
    status: "Vérifiée",
    description:
      "Catégorie de produit contenant les articles et leurs informations associées.",
    metadata: {
      Type: "categorie",
      Nom: "ARTICLES",
      Identité: "name:articles",
      Source: "account_move_reference.xlsx",
      Feuille: "Factures",
    },
  },
  {
    id: "clients",
    title: "Clients",
    type: "Organisation",
    path: "wiki/entities/organisations/clients.md",
    tags: ["client", "commercial"],
    status: "Vérifiée",
    description:
      "Répertoire des clients avec leurs informations commerciales et administratives.",
    metadata: {
      Type: "organisation",
      Nom: "Clients",
      Identité: "entity:clients",
      Source: "customers_2026.xlsx",
      Feuille: "Clients",
    },
  },
  {
    id: "factures-janvier",
    title: "Factures — Janvier 2026",
    type: "Document",
    path: "wiki/finance/factures/2026-01.md",
    tags: ["facture", "finance", "2026"],
    status: "À vérifier",
    description:
      "Synthèse des factures enregistrées pendant le mois de janvier 2026.",
    metadata: {
      Type: "factures",
      Nom: "Factures — Janvier 2026",
      Identité: "finance:invoices:2026-01",
      Source: "account_move_2026.csv",
      Lignes: "4 238",
    },
  },
  {
    id: "processus-onboarding",
    title: "Processus d’onboarding",
    type: "Autre",
    path: "wiki/processes/onboarding.md",
    tags: ["processus", "équipe"],
    status: "Vérifiée",
    description:
      "Description des étapes nécessaires pour intégrer un nouveau collaborateur.",
    metadata: {
      Type: "process",
      Nom: "Processus d’onboarding",
      Identité: "process:onboarding",
      Source: "processes_company.pdf",
      Page: "12-18",
    },
  },
];

const vaultNames: Record<string, string> = {
  "comptabilite-2026": "Comptabilité 2026",
  "lin-ventes-2026": "LIN — Ventes 2026",
  "prescription-nature": "Prescription Nature",
};

export default function WikiPagesPage() {
  const params = useParams<{ vaultId: string }>();
  const vaultName = vaultNames[params.vaultId] ?? "Vault";

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous les types");
  const [selectedId, setSelectedId] = useState("articles");

  const filteredPages = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return pages.filter((page) => {
      const matchesQuery =
        !normalizedQuery ||
        `${page.title} ${page.path} ${page.tags.join(" ")}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesType =
        typeFilter === "Tous les types" || page.type === typeFilter;

      return matchesQuery && matchesType;
    });
  }, [query, typeFilter]);

  const selectedPage =
    pages.find((page) => page.id === selectedId) ?? filteredPages[0];

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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-hoi-accent">
              Base de connaissances · {vaultName}
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
              Pages Wiki
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
              Recherchez et consultez les connaissances structurées de ce
              Vault.
            </p>
          </header>

          <section className="mb-6 rounded-card border border-hoi-border bg-hoi-surface p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-hoi-muted"
                />

                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher par titre, chemin ou tag..."
                  className="form-input w-full pl-10"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="form-input lg:w-52"
              >
                <option>Tous les types</option>
                <option>Document</option>
                <option>Organisation</option>
                <option>Catégorie</option>
                <option>Autre</option>
              </select>
            </div>

            <p className="mt-3 text-xs text-hoi-muted">
              La recherche porte sur les titres, chemins et tags. La recherche
              dans le contenu viendra avec Assistant Recherche Wiki.
            </p>
          </section>

          <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
            <section className="rounded-card border border-hoi-border bg-hoi-surface p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-hoi-navy">
                  Pages de connaissances
                </h2>

                <span className="text-xs text-hoi-muted">
                  {filteredPages.length} résultat(s)
                </span>
              </div>

              <div className="space-y-2">
                {filteredPages.map((page) => {
                  const isSelected = selectedPage?.id === page.id;

                  return (
                    <button
                      key={page.id}
                      type="button"
                      onClick={() => setSelectedId(page.id)}
                      className={`w-full rounded-lg border p-3 text-left transition ${
                        isSelected
                          ? "border-hoi-accent bg-blue-50"
                          : "border-transparent hover:border-hoi-border hover:bg-hoi-cream"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <FileText
                          size={17}
                          className="mt-0.5 shrink-0 text-hoi-navy"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-hoi-navy">
                            {page.title}
                          </p>

                          <p className="mt-1 text-xs text-hoi-muted">
                            {page.type} · {page.status}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              {selectedPage ? (
                <>
                  <div className="flex flex-col gap-4 border-b border-hoi-border pb-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-xs text-hoi-muted">
                        <CheckCircle2
                          size={15}
                          className={
                            selectedPage.status === "Vérifiée"
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }
                        />
                        {selectedPage.status}
                      </div>

                      <p className="break-all text-xs text-hoi-muted">
                        {selectedPage.path}
                      </p>

                      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-hoi-navy">
                        {selectedPage.title}
                      </h2>

                      <p className="mt-3 text-base leading-7 text-hoi-muted">
                        {selectedPage.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 rounded-lg border border-hoi-border px-4 py-2 text-sm font-medium text-hoi-navy hover:bg-hoi-cream"
                    >
                      Modifier la page
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedPage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full border border-hoi-border px-3 py-1 text-xs text-hoi-muted"
                      >
                        <Tag size={13} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 rounded-xl border border-hoi-border bg-hoi-cream/50 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-hoi-muted">
                      Métadonnées de la page
                    </h3>

                    <div className="mt-4 divide-y divide-hoi-border">
                      {Object.entries(selectedPage.metadata).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="grid gap-2 py-3 text-sm md:grid-cols-[160px_1fr]"
                          >
                            <span className="text-hoi-muted">{key}</span>
                            <span className="font-medium text-hoi-navy">
                              {value}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-hoi-navy">
                      Provenance
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-hoi-muted">
                      Cette page est liée à ses sources originales. Les
                      informations affichées pourront être vérifiées avant
                      toute modification.
                    </p>
                  </div>
                </>
              ) : (
                <div className="py-16 text-center text-hoi-muted">
                  Aucune page trouvée.
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}