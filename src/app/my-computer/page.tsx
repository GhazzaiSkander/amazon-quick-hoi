import { useTranslations } from "next-intl";
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
import InfoCard from "@/components/ui/InfoCard";

const infoCardKeys = ["localAccess", "personalControl", "indexing"] as const;
const infoCardIcons = {
  localAccess: <HardDrive size={19} />,
  personalControl: <Shield size={19} />,
  indexing: <CheckCircle2 size={19} />,
} as const;

export default function MyComputerPage() {
  const t = useTranslations("myComputer");

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
                  {t("title")}
                </h1>

                <p className="mt-2 max-w-3xl text-base leading-7 text-hoi-muted">
                  {t("subtitle")}
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
                  <h2 className="font-semibold text-hoi-navy">{t("title")}</h2>

                  <div className="mt-1 flex items-center gap-2 text-sm text-hoi-success">
                    <CheckCircle2 size={15} />
                    {t("connected")}
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-label={t("options")}
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
                      {t("localFolders")}
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-hoi-muted">
                      {t("localFoldersDescription")}
                    </p>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-hoi-muted">
                      {t("localFoldersHint")}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-hoi-border bg-hoi-cream/30 p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-hoi-navy shadow-sm">
                    <Folder size={30} />
                  </div>

                  <h3 className="mt-5 font-semibold text-hoi-navy">
                    {t("emptyTitle")}
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-hoi-muted">
                    {t("emptyDescription")}
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-hoi-border bg-hoi-cream/40 px-5 py-4 text-sm font-medium text-hoi-navy transition hover:border-hoi-navy hover:bg-hoi-cream"
                >
                  <FolderPlus size={18} />
                  {t("addFolder")}
                </button>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-3">
            {infoCardKeys.map((key) => (
              <InfoCard
                key={key}
                icon={infoCardIcons[key]}
                title={t(`cards.${key}.title`)}
                description={t(`cards.${key}.description`)}
              />
            ))}
          </section>
        </div>
      </div>
    </AppShell>
  );
}
