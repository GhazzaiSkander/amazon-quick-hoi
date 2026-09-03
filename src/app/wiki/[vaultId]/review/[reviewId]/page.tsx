"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
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

type FieldKey =
  | "invoiceNumber"
  | "thirdParty"
  | "amount"
  | "status"
  | "type"
  | "name"
  | "source"
  | "itemCount"
  | "pageName"
  | "sourcePages";

/**
 * A field value is either raw business data (`raw`), a keyed label from
 * `reviewDetail.values`, a currency amount, or a locale-formatted number.
 */
type FieldValue =
  | { kind: "raw"; value: string }
  | { kind: "key"; key: string }
  | { kind: "currency"; amount: number; currency: string }
  | { kind: "number"; value: number }
  | { kind: "pageRange"; from: number; to: number };

const reviewDetails: Record<
  string,
  {
    typeKey: "structuredData" | "wikiPage";
    source: string;
    author: string;
    extractedFields: {
      fieldKey: FieldKey;
      value: FieldValue;
      confidence: number;
    }[];
  }
> = {
  "review-1": {
    typeKey: "structuredData",
    source: "account_move_2026.csv",
    author: "Skander",
    extractedFields: [
      {
        fieldKey: "invoiceNumber",
        value: { kind: "raw", value: "FA2510110" },
        confidence: 0.94,
      },
      {
        fieldKey: "thirdParty",
        value: { kind: "raw", value: "Avenir Énergie" },
        confidence: 0.81,
      },
      {
        fieldKey: "amount",
        value: { kind: "currency", amount: 3420, currency: "EUR" },
        confidence: 0.96,
      },
      {
        fieldKey: "status",
        value: { kind: "key", key: "toVerify" },
        confidence: 0.62,
      },
    ],
  },
  "review-2": {
    typeKey: "wikiPage",
    source: "account_move_reference.xlsx",
    author: "Sabri",
    extractedFields: [
      {
        fieldKey: "type",
        value: { kind: "raw", value: "categorie" },
        confidence: 0.99,
      },
      {
        fieldKey: "name",
        value: { kind: "raw", value: "ARTICLES" },
        confidence: 0.99,
      },
      {
        fieldKey: "source",
        value: { kind: "raw", value: "account_move_reference.xlsx" },
        confidence: 0.97,
      },
      {
        fieldKey: "itemCount",
        value: { kind: "number", value: 2157 },
        confidence: 0.88,
      },
    ],
  },
  "review-3": {
    typeKey: "wikiPage",
    source: "process_onboarding.pdf",
    author: "Camille",
    extractedFields: [
      {
        fieldKey: "pageName",
        value: { kind: "key", key: "onboardingProcess" },
        confidence: 0.96,
      },
      {
        fieldKey: "type",
        value: { kind: "raw", value: "process" },
        confidence: 0.91,
      },
      {
        fieldKey: "sourcePages",
        value: { kind: "pageRange", from: 12, to: 18 },
        confidence: 0.74,
      },
      {
        fieldKey: "status",
        value: { kind: "key", key: "toValidate" },
        confidence: 0.69,
      },
    ],
  },
};

type DecisionKey = "reject" | "requestFix" | "accept";

export default function ReviewDetailPage() {
  const params = useParams<{ vaultId: string; reviewId: string }>();
  const t = useTranslations("reviewDetail");
  const tr = useTranslations("review");
  const format = useFormatter();

  const review = reviewDetails[params.reviewId];
  const [decision, setDecision] = useState<DecisionKey | null>(null);

  if (!review) {
    return (
      <AppShell>
        <div className="p-12 text-center text-hoi-muted">{t("notFound")}</div>
      </AppShell>
    );
  }

  function renderFieldValue(value: FieldValue) {
    switch (value.kind) {
      case "raw":
        return value.value;
      case "key":
        return t(`values.${value.key}`);
      case "currency":
        return format.number(value.amount, {
          style: "currency",
          currency: value.currency,
        });
      case "number":
        return format.number(value.value);
      case "pageRange":
        return t("values.pageRange", {
          from: format.number(value.from),
          to: format.number(value.to),
        });
    }
  }

  return (
    <AppShell>
      <div className="min-h-screen px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href={`/wiki/${params.vaultId}/review`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-hoi-muted hover:text-hoi-navy"
          >
            <ArrowLeft size={16} className="rtl-flip" />
            {t("back")}
          </Link>

          <header className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-sm text-amber-700">
              <AlertTriangle size={17} />
              {t("badge")}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-hoi-navy">
              {tr(`items.${params.reviewId}.title`)}
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
              {tr(`items.${params.reviewId}.description`)}
            </p>
          </header>

          {decision && (
            <section className="mb-8 rounded-card border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 text-emerald-700" />

                <div>
                  <p className="font-medium text-emerald-900">
                    {t("decisionRecorded")}
                  </p>

                  <p className="mt-1 text-sm text-emerald-800">
                    {t("decisionChosen", {
                      decision: t(`decisions.${decision}`),
                    })}
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
                    {t("originalSource")}
                  </p>

                  <h2 className="mt-1 font-semibold text-hoi-navy">
                    {review.source}
                  </h2>

                  <p className="mt-1 text-sm text-hoi-muted">
                    {t("addedBy", { name: review.author })}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-hoi-border bg-hoi-cream/50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-hoi-muted">
                  {t("sourceExcerpt")}
                </p>

                <div className="mt-4 space-y-3 text-sm leading-6 text-hoi-navy">
                  <p>
                    {t("excerpt.number")} : <strong>FA2510110</strong>
                  </p>

                  <p>
                    {t("excerpt.thirdParty")} : <strong>Avenir Énergie</strong>
                  </p>

                  <p>
                    {t("excerpt.totalAmount")} :{" "}
                    <strong>
                      {format.number(3420, {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </strong>
                  </p>

                  <p>
                    {t("excerpt.detectedStatus")} :{" "}
                    <strong>{t("values.toVerify")}</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-hoi-border px-4 py-2 text-sm font-medium text-hoi-navy hover:bg-hoi-cream"
              >
                <FileText size={16} />
                {t("openSource")}
              </button>
            </section>

            <section className="rounded-card border border-hoi-border bg-hoi-surface p-6 shadow-sm">
              <div className="mb-6 flex items-start gap-4">
                <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                  <FileCheck2 size={22} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-hoi-muted">
                    {t("proposedData")}
                  </p>

                  <h2 className="mt-1 font-semibold text-hoi-navy">
                    {t("analysisResult")}
                  </h2>

                  <p className="mt-1 text-sm text-hoi-muted">
                    {t("verifyFields")}
                  </p>
                </div>
              </div>

              <div className="divide-y divide-hoi-border rounded-xl border border-hoi-border">
                {review.extractedFields.map((field) => (
                  <div
                    key={field.fieldKey}
                    className="grid gap-2 p-4 md:grid-cols-[1fr_1.2fr_auto]"
                  >
                    <span className="text-sm text-hoi-muted">
                      {t(`fields.${field.fieldKey}`)}
                    </span>

                    <span className="text-sm font-medium text-hoi-navy">
                      {renderFieldValue(field.value)}
                    </span>

                    <span className="text-xs text-hoi-muted">
                      {format.number(field.confidence, { style: "percent" })}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm leading-6 text-blue-900">
                  {t("publishNotice")}
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
                  {t("commentTitle")}
                </h2>

                <textarea
                  placeholder={t("commentPlaceholder")}
                  className="form-input mt-4 min-h-24 w-full resize-y"
                />
              </div>
            </div>
          </section>

          <section className="mt-6 flex flex-col justify-end gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setDecision("reject")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-5 py-3 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              <X size={17} />
              {t("decisions.reject")}
            </button>

            <button
              type="button"
              onClick={() => setDecision("requestFix")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-hoi-border px-5 py-3 text-sm font-medium text-hoi-navy hover:bg-hoi-cream"
            >
              <MessageSquare size={17} />
              {t("decisions.requestFix")}
            </button>

            <button
              type="button"
              onClick={() => setDecision("accept")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-hoi-navy px-5 py-3 text-sm font-medium text-white hover:bg-hoi-navy-soft"
            >
              <Check size={17} />
              {t("decisions.accept")}
            </button>
          </section>

          <p className="mt-4 text-end text-xs text-hoi-muted">
            {t("prototypeNote")}
          </p>
        </div>
      </div>
    </AppShell>
  );
}
