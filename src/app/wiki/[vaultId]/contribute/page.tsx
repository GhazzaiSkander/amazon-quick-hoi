"use client";

import { type ChangeEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VaultSelector from "@/components/VaultSelector";
import PageHeader from "@/components/ui/PageHeader";
import { useFormatter, useTranslations } from "next-intl";
import {
  ArrowLeft,
  CheckCircle2,
  FilePlus2,
  FileText,
  FolderOpen,
  Info,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { getVaultName, type VaultId } from "@/lib/vaults";


const workflowStepKeys = ["analysis", "proposal", "validation"] as const;

export default function ContributePage() {
  const params = useParams<{ vaultId: string }>();
  const router = useRouter();
  const t = useTranslations("contribute");
  const tc = useTranslations("common");
  const tv = useTranslations("vault");
  const format = useFormatter();

  const vaultName = getVaultName(params.vaultId, tv("fallbackName"));

  const [mode, setMode] = useState<"file" | "folder">("file");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [importPrepared, setImportPrepared] = useState(false);

  function handleFileSelection(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setSelectedFiles(files);
  }

  /** Sizes go through the locale's number formatter, then a translated unit. */
  function formatFileSize(bytes: number) {
    if (bytes < 1024) {
      return t("fileSize.bytes", { size: format.number(bytes) });
    }

    if (bytes < 1024 * 1024) {
      return t("fileSize.kilobytes", {
        size: format.number(bytes / 1024, { maximumFractionDigits: 1 }),
      });
    }

    return t("fileSize.megabytes", {
      size: format.number(bytes / (1024 * 1024), { maximumFractionDigits: 1 }),
    });
  }

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/wiki/${params.vaultId}/sources`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-hoi-muted hover:text-hoi-navy"
          >
            <ArrowLeft size={16} className="rtl-flip" />
            {t("back")}
          </Link>

          <PageHeader
            eyebrow={t("eyebrow", { vault: vaultName })}
            title={t("title")}
            description={t("subtitle")}
          />

          <div className="mb-6 flex justify-end">
            <VaultSelector
              value={params.vaultId as VaultId}
              label={tv("eyebrow")}
              onChange={(nextVaultId) => {
                router.push(`/wiki/${nextVaultId}/contribute`);
              }}
            />
          </div>

          <section className="mb-8 rounded-card border border-blue-200 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 shrink-0 text-blue-700" size={20} />

              <div>
                <h2 className="font-semibold text-blue-900">
                  {t("scopeTitle", { vault: vaultName })}
                </h2>

                <p className="mt-1 text-sm leading-6 text-blue-800">
                  {t("scopeDescription")}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8 grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setMode("file")}
              className={`rounded-card border p-6 text-start transition ${
                mode === "file"
                  ? "border-hoi-accent bg-blue-50 ring-2 ring-hoi-accent/20"
                  : "border-hoi-border bg-hoi-surface hover:border-hoi-accent"
              }`}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-hoi-cream text-hoi-navy">
                <FilePlus2 size={22} />
              </div>

              <h2 className="text-lg font-semibold text-hoi-navy">
                {t("fileMode.title")}
              </h2>

              <p className="mt-2 text-sm leading-6 text-hoi-muted">
                {t("fileMode.description")}
              </p>

              {mode === "file" && (
                <p className="mt-4 text-sm font-medium text-hoi-accent">
                  {tc("selected")}
                </p>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMode("folder")}
              className={`rounded-card border p-6 text-start transition ${
                mode === "folder"
                  ? "border-hoi-accent bg-blue-50 ring-2 ring-hoi-accent/20"
                  : "border-hoi-border bg-hoi-surface hover:border-hoi-accent"
              }`}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-hoi-cream text-hoi-navy">
                <FolderOpen size={22} />
              </div>

              <h2 className="text-lg font-semibold text-hoi-navy">
                {t("folderMode.title")}
              </h2>

              <p className="mt-2 text-sm leading-6 text-hoi-muted">
                {t("folderMode.description")}
              </p>

              {mode === "folder" && (
                <p className="mt-4 text-sm font-medium text-hoi-accent">
                  {tc("selected")}
                </p>
              )}
            </button>
          </section>

          <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
            <div className="rounded-xl border-2 border-dashed border-hoi-border bg-hoi-cream/30 px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-hoi-surface text-hoi-navy shadow-sm">
                <Upload size={25} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-hoi-navy">
                {mode === "file" ? t("dropFile") : t("dropFolder")}
              </h2>

              <p className="mt-2 text-sm text-hoi-muted">{t("orSelect")}</p>

              <input
                id="source-upload"
                type="file"
                multiple={mode === "folder"}
                onChange={handleFileSelection}
                className="sr-only"
              />

              <label
                htmlFor="source-upload"
                className="mt-6 inline-flex cursor-pointer rounded-lg bg-hoi-navy px-5 py-3 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
              >
                {mode === "file" ? t("selectFile") : t("selectFiles")}
              </label>

              {selectedFiles.length > 0 && (
                <div className="mx-auto mt-5 max-w-lg rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-start">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-emerald-800">
                      {tc("files", { count: selectedFiles.length })}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedFiles([])}
                      className="text-xs font-medium text-emerald-700 hover:text-emerald-900"
                    >
                      {t("removeAll")}
                    </button>
                  </div>

                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={`${file.name}-${file.lastModified}-${index}`}
                        className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-white/60 p-3"
                      >
                        <FileText
                          size={18}
                          className="shrink-0 text-emerald-700"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-emerald-900">
                            {file.name}
                          </p>

                          <p className="mt-1 text-xs text-emerald-700">
                            {file.type || t("unknownType")} ·{" "}
                            {formatFileSize(file.size)}
                          </p>
                        </div>

                        <button
                          type="button"
                          aria-label={t("removeFile", { name: file.name })}
                          onClick={() =>
                            setSelectedFiles((currentFiles) =>
                              currentFiles.filter(
                                (_, fileIndex) => fileIndex !== index,
                              ),
                            )
                          }
                          className="rounded-md p-1.5 text-emerald-700 hover:bg-emerald-100"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedFiles.length > 0 && (
                <div className="mx-auto mt-6 max-w-lg border-t border-hoi-border pt-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-hoi-navy">
                        {t("readyTitle")}
                      </p>

                      <p className="mt-1 text-xs text-hoi-muted">
                        {t("readyDescription")}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setImportPrepared(true)}
                      className="rounded-lg bg-hoi-navy px-4 py-2.5 text-sm font-medium text-white transition hover:bg-hoi-navy-soft"
                    >
                      {t("prepareImport")}
                    </button>
                  </div>

                  {importPrepared && (
                    <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-start">
                      <p className="text-sm font-medium text-blue-900">
                        {t("preparedTitle")}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-800">
                        {t("preparedDescription")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <p className="mt-4 text-xs text-hoi-muted">{t("backendNote")}</p>
            </div>
          </section>

          <section className="mt-8 rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
            <h2 className="font-semibold text-hoi-navy">
              {t("afterImportTitle")}
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {workflowStepKeys.map((key, index) => (
                <WorkflowStep
                  key={key}
                  number={format.number(index + 1)}
                  title={t(`steps.${key}.title`)}
                  description={t(`steps.${key}.description`)}
                />
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-card border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 shrink-0 text-emerald-700"
                size={20}
              />

              <div>
                <h2 className="font-semibold text-emerald-900">
                  {t("traceabilityTitle")}
                </h2>

                <p className="mt-1 text-sm leading-6 text-emerald-800">
                  {t("traceabilityDescription")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function WorkflowStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hoi-navy text-sm font-semibold text-white">
        {number}
      </div>

      <div>
        <h3 className="font-medium text-hoi-navy">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-hoi-muted">{description}</p>
      </div>
    </div>
  );
}
