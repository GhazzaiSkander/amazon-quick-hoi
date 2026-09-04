"use client";

import AppShell from "@/components/layout/AppShell";
import ErrorState from "@/components/ui/ErrorState";
import { useTranslations } from "next-intl";

export default function WikiVaultError({ reset }: { reset: () => void }) {
  const t = useTranslations("common");

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <ErrorState
            title={t("states.errorTitle")}
            description={t("states.errorDescription")}
            action={
              <button
                type="button"
                onClick={reset}
                className="rounded-lg bg-hoi-navy px-4 py-2.5 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
              >
                {t("states.retry")}
              </button>
            }
          />
        </div>
      </div>
    </AppShell>
  );
}
