"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle2,
  FileCheck2,
  FileText,
  MessageSquare,
  X,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const reviewDetails: Record<
  string,
  {
    title: string;
    type: string;
    source: string;
    author: string;
    description: string;
    extractedFields: { field: string; value: string; confidence: string }[];
  }
> = {
  "review-1": {
    title: "12 factures nécessitent une vérification",
    type: "Données structurées",
    source: "account_move_2026.csv",
    author: "Skander",
    description:
      "Certaines informations extraites doivent être confirmées avant publication.",
    extractedFields: [
      {
        field: "Numéro de facture",
        value: "FA2510110",
        confidence: "94 %",
      },
      {
        field: "Tiers",
        value: "Avenir Énergie",
        confidence: "81 %",
      },
      {
        field: "Montant TTC",
        value: "3 420,00 €",
        confidence: "96 %",
      },
      {
        field: "Statut",
        value: "À vérifier",
        confidence: "62 %",
      },
    ],
  },
  "review-2": {
    title: "Mise à jour de la page ARTICLES",
    type: "Page Wiki",
    source: "account_move_reference.xlsx",
    author: "Sabri",
    description:
      "Une nouvelle version de la catégorie produit a été proposée.",
    extractedFields: [
      {
        field: "Type",
        value: "categorie",
        confidence: "99 %",
      },
      {
        field: "Nom",
        value: "ARTICLES",
        confidence: "99 %",
      },
      {
        field: "Source",
        value: "account_move_reference.xlsx",
        confidence: "97 %",
      },
      {
        field: "Nombre d’éléments",
        value: "2 157",
        confidence: "88 %",
      },
    ],
  },
  "review-3": {
    title: "Processus d’onboarding",
    type: "Page Wiki",
    source: "process_onboarding.pdf",
    author: "Camille",
    description:
      "Plusieurs passages nécessitent une validation avant intégration.",
    extractedFields: [
      {
        field: "Nom de la page",
        value: "Processus d’onboarding",
        confidence: "96 %",
      },
      {
        field: "Type",
        value: "process",
        confidence: "91 %",
      },
      {
        field: "Pages source",
        value: "12 à 18",
        confidence: "74 %",
      },
      {
        field: "Statut",
        value: "À valider",
        confidence: "69 %",
      },
    ],
  },
};

export default function ReviewDetailPage() {
  const params = useParams<{
    vaultId: string;
    reviewId: string;
  }>();

  const review = reviewDetails[params.reviewId];
  const [decision, setDecision] = useState<string | null>(null);

  if (!review) {
    return (
      <AppShell>
        <div className="p-12 text-center text-hoi-muted">
          Proposition de validation introuvable.
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href={`/wiki/${params.vaultId}/review`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-hoi-muted hover:text-hoi-navy"
          >
            <ArrowLeft size={16} />
            Retour à la file de validation
          </Link>

          <header className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-sm text-amber-700">
              <AlertTriangle size={17} />
              Proposition à examiner
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-hoi-navy">
              {review.title}
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
              {review.description}
            </p>
          </header>

          {decision && (
            <section className="mb-8 rounded-card border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 text-emerald-700"
                />

                <div>
                  <p className="font-medium text-emerald-900">
                    Décision enregistrée dans le prototype
                  </p>

                  <p className="mt-1 text-sm text-emerald-800">
                    Décision choisie : {decision}
                  </p>
                </div>
              </div>
            </section>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <div className="mb-6 flex items-start gap-4">
                <div className="rounded-lg bg-hoi-cream p-3 text-hoi-navy">
                  <FileText size={22} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-hoi-muted">
                    Source originale
                  </p>

                  <h2 className="mt-1 font-semibold text-hoi-navy">
                    {review.source}
                  </h2>

                  <p className="mt-1 text-sm text-hoi-muted">
                    Ajoutée par {review.author}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-hoi-border bg-hoi-cream/50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-hoi-muted">
                  Extrait de la source
                </p>

                <div className="mt-4 space-y-3 text-sm leading-6 text-hoi-navy">
                  <p>
                    Numéro : <strong>FA2510110</strong>
                  </p>

                  <p>
                    Tiers : <strong>Avenir Énergie</strong>
                  </p>

                  <p>
                    Montant total : <strong>3 420,00 €</strong>
                  </p>

                  <p>
                    Statut détecté : <strong>À vérifier</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-hoi-border px-4 py-2 text-sm font-medium text-hoi-navy hover:bg-hoi-cream"
              >
                <FileText size={16} />
                Ouvrir la source
              </button>
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <div className="mb-6 flex items-start gap-4">
                <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                  <FileCheck2 size={22} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-hoi-muted">
                    Données proposées
                  </p>

                  <h2 className="mt-1 font-semibold text-hoi-navy">
                    Résultat de l’analyse
                  </h2>

                  <p className="mt-1 text-sm text-hoi-muted">
                    Vérifiez chaque champ avant publication.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-hoi-border rounded-xl border border-hoi-border">
                {review.extractedFields.map((field) => (
                  <div
                    key={field.field}
                    className="grid gap-2 p-4 md:grid-cols-[1fr_1.2fr_auto]"
                  >
                    <span className="text-sm text-hoi-muted">
                      {field.field}
                    </span>

                    <span className="text-sm font-medium text-hoi-navy">
                      {field.value}
                    </span>

                    <span className="text-xs text-hoi-muted">
                      {field.confidence}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm leading-6 text-blue-900">
                  Les informations acceptées seront publiées dans le Vault et
                  liées à leur source originale.
                </p>
              </div>
            </section>
          </div>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-hoi-cream p-3 text-hoi-navy">
                <MessageSquare size={21} />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-hoi-navy">
                  Commentaire de validation
                </h2>

                <textarea
                  placeholder="Ajouter une remarque pour expliquer votre décision..."
                  className="form-input mt-4 min-h-24 w-full resize-y"
                />
              </div>
            </div>
          </section>

          <section className="mt-6 flex flex-col justify-end gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setDecision("Refuser")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-5 py-3 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              <X size={17} />
              Refuser
            </button>

            <button
              type="button"
              onClick={() => setDecision("Demander une correction")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-hoi-border px-5 py-3 text-sm font-medium text-hoi-navy hover:bg-hoi-cream"
            >
              <MessageSquare size={17} />
              Demander une correction
            </button>

            <button
              type="button"
              onClick={() => setDecision("Accepter")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-hoi-navy px-5 py-3 text-sm font-medium text-white hover:bg-hoi-navy-soft"
            >
              <Check size={17} />
              Accepter et publier
            </button>
          </section>

          <p className="mt-4 text-right text-xs text-hoi-muted">
            Prototype frontend : les décisions seront enregistrées dans le
            backend ultérieurement.
          </p>
        </div>
      </div>
    </AppShell>
  );
}