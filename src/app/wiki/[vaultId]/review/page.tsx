"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileCheck2,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const reviewItems = [
  {
    id: "review-1",
    title: "12 factures nécessitent une vérification",
    type: "Données structurées",
    source: "account_move_2026.csv",
    author: "Skander",
    date: "Aujourd’hui à 09:42",
    confidence: "Confiance moyenne",
    status: "À examiner",
    description:
      "Certaines informations extraites doivent être confirmées avant publication.",
  },
  {
    id: "review-2",
    title: "Mise à jour de la page ARTICLES",
    type: "Page Wiki",
    source: "account_move_reference.xlsx",
    author: "Sabri",
    date: "Hier à 16:20",
    confidence: "Confiance élevée",
    status: "À examiner",
    description:
      "Une nouvelle version de la catégorie produit a été proposée.",
  },
  {
    id: "review-3",
    title: "Processus d’onboarding",
    type: "Page Wiki",
    source: "process_onboarding.pdf",
    author: "Camille",
    date: "30 août 2026",
    confidence: "Confiance faible",
    status: "À examiner",
    description:
      "Plusieurs passages nécessitent une validation avant intégration.",
  },
  {
    id: "review-4",
    title: "Réconciliation de 28 pièces comptables",
    type: "Données structurées",
    source: "account_move_2026.csv",
    author: "Skander",
    date: "29 août 2026",
    confidence: "Validée",
    status: "Validée",
    description:
      "La proposition a été vérifiée et intégrée aux données du Vault.",
  },
];

const vaultNames: Record<string, string> = {
  "comptabilite-2026": "Comptabilité 2026",
  "lin-ventes-2026": "LIN — Ventes 2026",
  "prescription-nature": "Prescription Nature",
};

export default function ReviewPage() {
  const params = useParams<{ vaultId: string }>();
  const vaultName = vaultNames[params.vaultId] ?? "Vault";

  const [statusFilter, setStatusFilter] = useState("À examiner");

  const filteredItems = useMemo(() => {
    if (statusFilter === "Toutes") {
      return reviewItems;
    }

    return reviewItems.filter((item) => item.status === statusFilter);
  }, [statusFilter]);

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
              Contrôle des données · {vaultName}
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
              Validation humaine
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
              Examinez les propositions issues des imports avant leur
              publication dans le Wiki et les données structurées.
            </p>
          </header>

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={<Clock3 size={20} />}
              value="12"
              label="À examiner"
              tone="amber"
            />

            <MetricCard
              icon={<CheckCircle2 size={20} />}
              value="48"
              label="Validées cette semaine"
              tone="green"
            />

            <MetricCard
              icon={<UserCircle2 size={20} />}
              value="3"
              label="Contributeurs actifs"
              tone="blue"
            />
          </section>

          <section className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-hoi-navy">
                  File de validation
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  Les modifications importantes nécessitent une décision
                  humaine.
                </p>
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="form-input md:w-48"
              >
                <option>À examiner</option>
                <option>Validée</option>
                <option>Toutes</option>
              </select>
            </div>

            <div className="space-y-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-hoi-border p-5 transition hover:border-hoi-accent"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`rounded-lg p-3 ${
                          item.status === "Validée"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.status === "Validée" ? (
                          <CheckCircle2 size={21} />
                        ) : (
                          <AlertTriangle size={21} />
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-hoi-navy">
                            {item.title}
                          </h3>

                          <span className="rounded-full bg-hoi-cream px-3 py-1 text-xs text-hoi-muted">
                            {item.type}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-hoi-muted">
                          {item.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-hoi-muted">
                          <span>Source : {item.source}</span>
                          <span>Ajouté par : {item.author}</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.status === "Validée"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>

                      <span className="text-xs text-hoi-muted">
                        {item.confidence}
                      </span>

<Link
  href={`/wiki/${params.vaultId}/review/${item.id}`}
  className="inline-flex items-center gap-2 rounded-lg bg-hoi-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
>
  <FileCheck2 size={16} />
  Examiner
</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="py-12 text-center text-sm text-hoi-muted">
                Aucun élément ne correspond à ce filtre.
              </div>
            )}
          </section>

          <section className="mt-8 rounded-card border border-dashed border-hoi-border bg-white/40 p-6">
            <h2 className="font-semibold text-hoi-navy">
              Règle de publication
            </h2>

            <p className="mt-2 text-sm leading-6 text-hoi-muted">
              Les données simples et fiables pourront être publiées
              automatiquement. Les changements ambigus ou sensibles resteront
              dans cette file jusqu’à leur validation par un utilisateur
              autorisé.
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
  tone,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  tone: "amber" | "green" | "blue";
}) {
  const colors = {
    amber: "bg-amber-50 text-amber-700",
    green: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
  };

  return (
    <div className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${colors[tone]}`}
      >
        {icon}
      </div>

      <p className="text-2xl font-semibold text-hoi-navy">{value}</p>
      <p className="mt-1 text-sm text-hoi-muted">{label}</p>
    </div>
  );
}