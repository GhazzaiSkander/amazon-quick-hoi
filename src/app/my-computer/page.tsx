import {
  CheckCircle2,
  Folder,
  FolderPlus,
  HardDrive,
  Monitor,
  MoreVertical,
  Shield,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

export default function MyComputerPage() {
  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <header className="border-b border-hoi-border pb-8">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                <Monitor size={24} />
              </div>

              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
                  Mon ordinateur
                </h1>

                <p className="mt-2 max-w-3xl text-base leading-7 text-hoi-muted">
                  Les dossiers locaux que House of Ichigo peut rechercher et
                  lire. Les espaces cloud se connectent avec une ingestion
                  personnelle gouvernée.
                </p>
              </div>
            </div>
          </header>

          <section className="mt-6 rounded-card border border-hoi-border bg-hoi-surface px-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-hoi-border py-5">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-hoi-cream p-2.5 text-hoi-navy">
                  <Monitor size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-hoi-navy">
                    Mon ordinateur
                  </h2>

                  <div className="mt-1 flex items-center gap-2 text-sm text-hoi-success">
                    <CheckCircle2 size={15} />
                    Connecté
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-label="Options de l'ordinateur"
                className="rounded-lg p-2 text-hoi-muted transition hover:bg-hoi-cream hover:text-hoi-navy"
              >
                <MoreVertical size={19} />
              </button>
            </div>

            <div className="p-5">
              <div className="rounded-card border border-hoi-border bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-hoi-cream p-3 text-hoi-navy">
                    <Shield size={23} />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-hoi-navy">
                      Dossiers locaux
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-hoi-muted">
                      House of Ichigo peut rechercher les fichiers des dossiers
                      que vous autorisez. La recherche fonctionne
                      automatiquement pour chaque dossier ajouté.
                    </p>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-hoi-muted">
                      Utilisez les interrupteurs de chaque dossier pour activer
                      ou désactiver l’indexation sémantique.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-hoi-border bg-hoi-cream/30 p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-hoi-navy shadow-sm">
                    <Folder size={30} />
                  </div>

                  <h3 className="mt-5 font-semibold text-hoi-navy">
                    Aucun dossier ajouté
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-hoi-muted">
                    Ajoutez un dossier pour permettre à vos agents de lire vos
                    fichiers privés.
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-hoi-border bg-hoi-cream/40 px-5 py-4 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy hover:bg-hoi-cream"
                >
                  <FolderPlus size={18} />
                  Ajouter un dossier
                </button>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-3">
            <InfoCard
              icon={<HardDrive size={19} />}
              title="Accès local"
              description="Les agents ne lisent que les dossiers explicitement autorisés."
            />

            <InfoCard
              icon={<Shield size={19} />}
              title="Contrôle personnel"
              description="Vos fichiers personnels restent dans votre périmètre privé."
            />

            <InfoCard
              icon={<CheckCircle2 size={19} />}
              title="Indexation contrôlée"
              description="Activez l’indexation séparément pour chaque dossier."
            />
          </section>
        </div>
      </div>
    </AppShell>
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