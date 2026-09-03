"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileText,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const vaultNames: Record<string, string> = {
  "comptabilite-2026": "Comptabilité 2026",
  "lin-ventes-2026": "LIN — Ventes 2026",
  "prescription-nature": "Prescription Nature",
};

const suggestions = [
  "Quelles sont les factures impayées du dernier trimestre ?",
  "Quels sont les principaux fournisseurs de cette année ?",
  "Résume le processus de lancement produit.",
];

export default function DeepSearchPage() {
  const params = useParams<{ vaultId: string }>();
  const vaultName = vaultNames[params.vaultId] ?? "Vault";

  const [objective, setObjective] = useState("");
  const [mode, setMode] = useState("Recherche approfondie");
  const [includePersonalContext, setIncludePersonalContext] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  function launchSearch() {
    if (!objective.trim()) {
      return;
    }

    setHasSearched(true);
  }

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/wiki/${params.vaultId}`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-hoi-muted hover:text-hoi-navy"
          >
            <ArrowLeft size={16} />
            Retour à {vaultName}
          </Link>

          <header className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-hoi-accent">
              Recherche assistée · {vaultName}
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
              Assistant Recherche Wiki
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
              Posez une question complexe et obtenez une réponse fondée sur
              les données et les sources autorisées.
            </p>
          </header>

          <section className="mb-6 rounded-card border border-blue-200 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-0.5 shrink-0 text-blue-700" size={20} />

              <div>
                <h2 className="font-semibold text-blue-900">
                  Périmètre de recherche
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-medium text-white">
                    Vault : {vaultName}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setIncludePersonalContext(!includePersonalContext)
                    }
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      includePersonalContext
                        ? "border-blue-700 bg-blue-100 text-blue-900"
                        : "border-blue-300 bg-white text-blue-700"
                    }`}
                  >
                    {includePersonalContext
                      ? "Contexte personnel activé"
                      : "+ Ajouter mon contexte personnel"}
                  </button>
                </div>

                <p className="mt-3 text-xs leading-5 text-blue-800">
                  La recherche ne consultera que les données incluses dans ce
                  périmètre.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles size={19} className="text-hoi-accent" />

              <h2 className="font-semibold text-hoi-navy">
                Définir votre recherche
              </h2>
            </div>

            <textarea
              value={objective}
              onChange={(event) => setObjective(event.target.value)}
              placeholder="Ex. Compare les factures impayées avec les conditions de paiement prévues dans nos procédures..."
              className="form-input min-h-32 w-full resize-y"
            />

            <div className="mt-4 flex flex-col gap-4 border-t border-hoi-border pt-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <label
                  htmlFor="search-mode"
                  className="text-sm text-hoi-muted"
                >
                  Mode
                </label>

                <select
                  id="search-mode"
                  value={mode}
                  onChange={(event) => setMode(event.target.value)}
                  className="form-input w-auto"
                >
                  <option>Recherche rapide</option>
                  <option>Recherche approfondie</option>
                </select>
              </div>

              <button
                type="button"
                onClick={launchSearch}
                disabled={!objective.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-hoi-navy px-5 py-3 text-sm font-medium text-white transition hover:bg-hoi-navy-soft disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Search size={17} />
                Lancer la recherche
              </button>
            </div>
          </section>

          {!hasSearched && (
            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-hoi-navy">
                  Exemples de recherches
                </h2>

                <span className="text-xs text-hoi-muted">
                  Pour commencer rapidement
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setObjective(suggestion)}
                    className="rounded-card border border-hoi-border bg-hoi-surface p-4 text-left text-sm text-hoi-navy shadow-sm transition hover:border-hoi-accent"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </section>
          )}

          {hasSearched && (
            <section className="mt-8">
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-hoi-navy">
                    Résultat de la recherche
                  </h2>

                  <p className="mt-1 text-sm text-hoi-muted">
                    Mode utilisé : {mode}
                  </p>
                </div>

                <span className="text-xs text-hoi-muted">
                  3 sources consultées
                </span>
              </div>

              <div className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-1 shrink-0 text-emerald-600"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-hoi-navy">
                      Synthèse basée sur les données du Vault
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-hoi-navy">
                      Les éléments consultés indiquent que les factures
                      nécessitant une attention particulière sont associées à
                      des statuts de paiement incomplets ou à des informations
                      qui doivent être vérifiées dans la source originale.
                    </p>

                    <p className="mt-4 text-sm leading-7 text-hoi-navy">
                      Une vérification complémentaire est recommandée avant
                      toute décision financière définitive.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-hoi-border pt-5">
                  <h3 className="mb-3 text-sm font-semibold text-hoi-navy">
                    Sources consultées
                  </h3>

                  <div className="space-y-2">
                    <SourceCitation
                      name="account_move_2026.csv"
                      detail="Factures et statuts de paiement"
                    />

                    <SourceCitation
                      name="Factures — Janvier 2026"
                      detail="Page Wiki de synthèse"
                    />

                    <SourceCitation
                      name="process_paiement.pdf"
                      detail="Procédure de suivi des paiements"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          <p className="mt-6 text-center text-xs text-hoi-muted">
            Prototype frontend : les résultats seront connectés au moteur de
            recherche et au serveur MCP ultérieurement.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

function SourceCitation({
  name,
  detail,
}: {
  name: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-hoi-border p-3">
      <FileText size={17} className="shrink-0 text-hoi-navy" />

      <div>
        <p className="text-sm font-medium text-hoi-navy">{name}</p>
        <p className="mt-1 text-xs text-hoi-muted">{detail}</p>
      </div>
    </div>
  );
}