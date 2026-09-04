import LoadingState from "@/components/ui/LoadingState";
import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("common");

  return (
    <div className="min-h-screen px-6 py-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <LoadingState
          title={t("states.loadingTitle")}
          description={t("states.loadingDescription")}
        />
      </div>
    </div>
  );
}
