"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { setUserLocale } from "@/i18n/locale";
import { isLocale, locales, localeLabels } from "@/i18n/config";

/**
 * Writes the locale cookie through a server action, then refreshes so the
 * server re-renders with the new messages and the new `lang`/`dir` on <html>.
 */
export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("customization.language");
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    if (!isLocale(value) || value === locale) return;

    startTransition(async () => {
      await setUserLocale(value);
      router.refresh();
    });
  }

  return (
    <div className="mt-6 max-w-md">
      <label
        htmlFor="language"
        className="mb-2 block text-sm font-medium text-hoi-navy"
      >
        {t("label")}
      </label>

      <select
        id="language"
        value={locale}
        disabled={isPending}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-hoi-border bg-white px-4 py-3 text-sm text-hoi-navy outline-none focus:border-hoi-navy disabled:opacity-60"
      >
        {locales.map((value) => (
          <option key={value} value={value}>
            {localeLabels[value]}
          </option>
        ))}
      </select>

      {isPending && (
        <p className="mt-2 text-xs text-hoi-muted">{t("saving")}</p>
      )}
    </div>
  );
}
