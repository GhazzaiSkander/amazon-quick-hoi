"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Database,
  FileText,
  Search,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const invoices = [
  {
    id: "FA2515312",
    number: "FA2515312",
    date: "2026-01-08",
    thirdParty: "Vanhoeve Dylan",
    amount: "1 245,00 €",
    status: "Payée",
    source: "account_move_2026.csv",
  },
  {
    id: "FA2514447",
    number: "FA2514447",
    date: "2026-01-16",
    thirdParty: "Lixxball",
    amount: "860,50 €",
    status: "Payée",
    source: "account_move_2026.csv",
  },
  {
    id: "FA2510110",
    number: "FA2510110",
    date: "2026-02-22",
    thirdParty: "Avenir Énergie",
    amount: "3 420,00 €",
    status: "À vérifier",
    source: "account_move_2026.csv",
  },
  {
    id: "FA2504135",
    number: "FA2504135",
    date: "2026-03-17",
    thirdParty: "Ciblex Express",
    amount: "2 180,75 €",
    status: "Payée",
    source: "account_move_2026.csv",
  },
];

const vaultNames: Record<string, string> = {
  "comptabilite-2026": "Comptabilité 2026",
  "lin-ventes-2026": "LIN — Ventes 2026",
  "prescription-nature": "Prescription Nature",
};

export default function StructuredDataPage() {
  const params = useParams<{ vaultId: string }>();
  const vaultName = vaultNames[params.vaultId] ?? "Vault";

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous les statuts");

  const filteredInvoices = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return invoices.filter((invoice) => {
      const matchesQuery =
        !normalizedQuery ||
        `${invoice.number} ${invoice.thirdParty} ${invoice.source}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "Tous les statuts" ||
        invoice.status === statusFilter;

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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-hoi-accent">
              Données du Vault · {vaultName}
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
              Données structurées
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
              Explorez les données extraites et normalisées à partir des
              sources du Vault.
            </p>
          </header>

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={<Database size={20} />}
              value="49 920"
              label="Enregistrements"
            />

            <MetricCard
              icon={<FileText size={20} />}
              value="4 238"
              label="Factures"
            />

            <MetricCard
              icon={<CircleAlert size={20} />}
              value="12"
              label="À vérifier"
            />
          </section>

          <section className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-hoi-navy">
                  Factures
                </h2>

                <p className="mt-1 text-sm text-hoi-muted">
                  Données extraites du référentiel comptable.
                </p>
              </div>

              <span className="text-sm text-hoi-muted">
                {filteredInvoices.length} résultat(s)
              </span>
            </div>

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
                  placeholder="Rechercher par numéro ou tiers..."
                  className="form-input w-full pl-10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="form-input lg:w-48"
              >
                <option>Tous les statuts</option>
                <option>Payée</option>
                <option>À vérifier</option>
              </select>
            </div>

            <div className="overflow-x-auto rounded-xl border border-hoi-border">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-hoi-cream text-xs uppercase tracking-wide text-hoi-muted">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Numéro</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Tiers</th>
                    <th className="px-4 py-3 font-semibold">Montant TTC</th>
                    <th className="px-4 py-3 font-semibold">Statut</th>
                    <th className="px-4 py-3 font-semibold">Source</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-hoi-border">
                  {filteredInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="transition hover:bg-hoi-cream/50"
                    >
                      <td className="px-4 py-4 font-medium text-hoi-navy">
                        {invoice.number}
                      </td>

                      <td className="px-4 py-4 text-hoi-muted">
                        {invoice.date}
                      </td>

                      <td className="px-4 py-4 text-hoi-navy">
                        {invoice.thirdParty}
                      </td>

                      <td className="px-4 py-4 font-medium text-hoi-navy">
                        {invoice.amount}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                            invoice.status === "Payée"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {invoice.status === "Payée" ? (
                            <CheckCircle2 size={13} />
                          ) : (
                            <CircleAlert size={13} />
                          )}

                          {invoice.status}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-xs text-hoi-muted">
                        {invoice.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredInvoices.length === 0 && (
              <div className="py-12 text-center text-sm text-hoi-muted">
                Aucune donnée ne correspond à votre recherche.
              </div>
            )}
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