import {
  Building2,
  Check,
  ChevronRight,
  Rocket,
  Users,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const steps = [
  "Bases de l’entreprise",
  "Organisation",
  "Outils utilisés",
  "Priorités",
  "Invitations",
  "Lancer l’espace",
];

export default function SetupPage() {
  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <section className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-hoi-muted">
              Configuration de l’entreprise
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {steps.map((step, index) => {
                const active = index === 0;
                const completed = index < 0;

                return (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${
                        active
                          ? "border-hoi-navy bg-hoi-cream text-hoi-navy"
                          : "border-hoi-border bg-white text-hoi-muted"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                          active
                            ? "bg-hoi-navy text-white"
                            : "bg-hoi-cream text-hoi-muted"
                        }`}
                      >
                        {completed ? <Check size={13} /> : index + 1}
                      </span>

                      <span className="hidden md:inline">{step}</span>
                    </div>

                    {index < steps.length - 1 && (
                      <ChevronRight
                        size={16}
                        className="text-hoi-border"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface p-7 shadow-sm lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-hoi-muted">
                  Étape 1 sur 6
                </p>

                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-hoi-navy">
                  Les bases de votre entreprise
                </h1>

                <p className="mt-3 max-w-3xl text-base leading-7 text-hoi-muted">
                  Ces informations permettront à vos agents de mieux comprendre
                  votre organisation, vos processus et vos priorités.
                </p>
              </div>

              <span className="rounded-full bg-hoi-cream px-4 py-2 text-sm font-medium text-hoi-navy">
                Brouillon
              </span>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <FormField label="Nom de l’entreprise">
                <input
                  type="text"
                  placeholder="Ex. House of Ichigo"
                  className="form-input"
                />
              </FormField>

              <FormField label="Secteur d’activité">
                <select className="form-input" defaultValue="">
                  <option value="" disabled>
                    Sélectionner un secteur
                  </option>
                  <option>Services professionnels</option>
                  <option>Technologie</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>Ressources humaines</option>
                  <option>Autre</option>
                </select>
              </FormField>

              <FormField label="Sous-secteur">
                <input
                  type="text"
                  placeholder="Ex. Automatisation et conseil IA"
                  className="form-input"
                />
              </FormField>

              <FormField label="Taille de l’entreprise">
                <select className="form-input" defaultValue="">
                  <option value="" disabled>
                    Sélectionner une taille
                  </option>
                  <option>1–10</option>
                  <option>11–50</option>
                  <option>51–250</option>
                  <option>251–1 000</option>
                  <option>Plus de 1 000</option>
                </select>
              </FormField>

              <FormField label="Modèle économique">
                <select className="form-input" defaultValue="">
                  <option value="" disabled>
                    Sélectionner un modèle
                  </option>
                  <option>B2B</option>
                  <option>B2C</option>
                  <option>B2B2C</option>
                  <option>Association</option>
                  <option>Autre</option>
                </select>
              </FormField>

              <FormField label="Phase de croissance">
                <select className="form-input" defaultValue="">
                  <option value="" disabled>
                    Sélectionner une phase
                  </option>
                  <option>Création</option>
                  <option>Lancement</option>
                  <option>Scale-up</option>
                  <option>Maturité</option>
                  <option>Transformation</option>
                </select>
              </FormField>

              <FormField label="Type de clients">
                <select className="form-input" defaultValue="">
                  <option value="" disabled>
                    Sélectionner un type
                  </option>
                  <option>Startups</option>
                  <option>PME</option>
                  <option>ETI</option>
                  <option>Grands comptes</option>
                  <option>Grand public</option>
                </select>
              </FormField>

              <FormField label="Zone géographique">
                <input
                  type="text"
                  placeholder="Ex. France, Europe"
                  className="form-input"
                />
              </FormField>
            </div>

            <div className="mt-10 rounded-xl border border-hoi-border bg-hoi-cream/40 p-5">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-white p-2.5 text-hoi-navy">
                  <Building2 size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-hoi-navy">
                    Pourquoi ces informations ?
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-hoi-muted">
                    Elles serviront à personnaliser les tableaux de bord, les
                    modèles, les rapports et les suggestions de vos agents.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-hoi-border pt-6">
              <button
                type="button"
                className="rounded-lg border border-hoi-border bg-white px-5 py-3 text-sm font-medium text-hoi-muted transition hover:border-hoi-navy hover:text-hoi-navy"
              >
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
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-3">
            <InfoCard
              icon={<Users size={19} />}
              title="Multi-utilisateur"
              description="Les étapes suivantes permettront d’inviter les membres de votre équipe."
            />

            <InfoCard
              icon={<Rocket size={19} />}
              title="Espace configurable"
              description="Chaque organisation pourra définir ses propres règles et sources."
            />

            <InfoCard
              icon={<Building2 size={19} />}
              title="Contexte entreprise"
              description="Les agents pourront adapter leurs réponses à votre organisation."
            />
          </section>
        </div>
      </div>
    </AppShell>
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
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-hoi-muted">
        {label}
      </span>

      {children}
    </label>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hoi-cream text-hoi-navy">
        {icon}
      </div>

      <h2 className="mt-4 font-semibold text-hoi-navy">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-hoi-muted">{description}</p>
    </div>
  );
}