"use client";
import {
  ArrowUp,
  BookOpen,
  Bot,
  ChevronDown,
  Mic,
  MoreHorizontal,
  Paperclip,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
const vaultNames: Record<string, string> = {
  "comptabilite-2026": "Comptabilité 2026",
  "lin-ventes-2026": "LIN — Ventes 2026",
  "prescription-nature": "Prescription Nature",
};
export default function ChatPage() {
const router = useRouter();
const searchParams = useSearchParams();
const vaultId = searchParams.get("vaultId");
const activeVault = vaultId ? vaultNames[vaultId] : null;
const [includePersonalContext, setIncludePersonalContext] =
  useState(false);
const [question, setQuestion] = useState("");
const [submittedQuestion, setSubmittedQuestion] = useState<string | null>(
  null,
);

function handleSubmit() {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    return;
  }

  setSubmittedQuestion(trimmedQuestion);
  setQuestion("");
}
  return (
    <AppShell>
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b border-hoi-border bg-hoi-surface px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-hoi-cream p-2 text-hoi-navy">
                <Bot size={18} />
              </div>

              <h1 className="font-semibold text-hoi-navy">
{activeVault ? "Assistant Wiki" : "Assistant général"}              </h1>

              <ChevronDown size={16} className="text-hoi-muted" />
            </div>

            <p className="mt-1 text-sm text-hoi-muted">
{activeVault
  ? `Vault actif : ${activeVault}`
  : "House of Ichigo · Conversation privée"}            </p>
          </div>

          <button
            type="button"
            aria-label="Options de la conversation"
            className="rounded-lg p-2 text-hoi-muted transition hover:bg-hoi-cream hover:text-hoi-navy"
          >
            <MoreHorizontal size={20} />
          </button>
        </header>
        <button
  type="button"
  onClick={() => setIncludePersonalContext(!includePersonalContext)}
  className={`mb-5 w-full rounded-xl border p-4 text-left transition ${
    includePersonalContext
      ? "border-emerald-200 bg-emerald-50"
      : "border-hoi-border bg-white hover:border-hoi-accent"
  }`}
>
  <p className="text-xs font-semibold uppercase tracking-wide text-hoi-muted">
    Contexte personnel
  </p>

  <p
    className={`mt-2 text-sm font-medium ${
      includePersonalContext
        ? "text-emerald-800"
        : "text-hoi-navy"
    }`}
  >
    {includePersonalContext
      ? "Activé pour cette conversation"
      : "Ajouter mon contexte personnel"}
  </p>

  <p className="mt-1 text-xs leading-5 text-hoi-muted">
    {includePersonalContext
      ? "L’Assistant peut utiliser vos connaissances personnelles."
      : "Vos données personnelles restent exclues par défaut."}
  </p>
</button>

        <div className="flex flex-1 flex-col lg:flex-row">
          <main className="flex flex-1 flex-col">
            <div className="flex-1 px-6 py-8 lg:px-16">
              <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                  <p className="text-sm font-medium text-hoi-muted">
                    Aujourd’hui
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-hoi-navy">
                    Comment puis-je vous aider ?
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-end">
                    <div className="max-w-xl rounded-2xl rounded-br-md bg-hoi-navy px-5 py-4 text-sm leading-6 text-white">
                      Résume-moi les priorités de notre équipe pour cette
                      semaine.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-hoi-cream text-hoi-navy">
                      <Sparkles size={18} />
                    </div>

                    <div className="max-w-2xl rounded-2xl rounded-tl-md border border-hoi-border bg-hoi-surface px-5 py-4">
                      <p className="text-sm leading-7 text-hoi-navy">
                        Voici une synthèse des priorités identifiées :
                      </p>

                      <ol className="mt-3 space-y-3 text-sm leading-6 text-hoi-navy">
                        <li>
                          <span className="font-semibold">1.</span> Finaliser
                          les projets clients actuellement en production.
                        </li>

                        <li>
                          <span className="font-semibold">2.</span> Vérifier
                          les automatisations nécessitant une supervision.
                        </li>

                        <li>
                          <span className="font-semibold">3.</span> Préparer
                          les prochaines réunions et livrables.
                        </li>
                      </ol>

                      <div className="mt-5 flex flex-wrap gap-2 border-t border-hoi-border pt-4">
                        <span className="rounded-full bg-hoi-cream px-3 py-1 text-xs text-hoi-navy">
                          My Context
                        </span>

                        <span className="rounded-full bg-hoi-cream px-3 py-1 text-xs text-hoi-navy">
                          Activity Feed
                        </span>

                        <span className="rounded-full bg-hoi-cream px-3 py-1 text-xs text-hoi-navy">
                          3 sources
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-8 lg:px-16">
              <div className="mx-auto max-w-3xl">
                <div className="rounded-2xl border border-hoi-border bg-hoi-surface p-4 shadow-sm">
<textarea
  value={question}
  onChange={(event) => setQuestion(event.target.value)}
  placeholder="Posez une question..."
  className="min-h-24 w-full resize-none border-0 bg-transparent p-2 text-sm leading-6 text-hoi-navy outline-none placeholder:text-hoi-muted/60"
/>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hoi-border pt-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Ajouter une pièce jointe"
                        className="rounded-lg p-2 text-hoi-muted transition hover:bg-hoi-cream hover:text-hoi-navy"
                      >
                        <Paperclip size={18} />
                      </button>

                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-hoi-navy transition hover:bg-hoi-cream"
                      >
                        <BookOpen size={16} />
                        Tous les outils
                      </button>

                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-hoi-navy transition hover:bg-hoi-cream"
                      >
                        <Sparkles size={16} />
                        Smart
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Utiliser le microphone"
                        className="rounded-lg p-2 text-hoi-muted transition hover:bg-hoi-cream hover:text-hoi-navy"
                      >
                        <Mic size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!question.trim()}
                        aria-label="Envoyer le message"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-hoi-navy text-white transition hover:bg-hoi-navy-soft"
                      >
                        <ArrowUp size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                {submittedQuestion && (
  <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
    <p className="text-sm font-medium text-blue-900">
      Question envoyée
    </p>

    <p className="mt-2 text-sm text-blue-800">
      « {submittedQuestion} »
    </p>

    <div className="mt-4 border-t border-blue-200 pt-4">
      <p className="text-sm font-medium text-blue-900">
        Réponse de démonstration
      </p>

      <p className="mt-2 text-sm leading-6 text-blue-800">
        L’Assistant analysera les données autorisées du Vault sélectionné et
        affichera une réponse accompagnée de ses sources.
      </p>

      {activeVault && (
        <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs text-blue-700">
          Périmètre : {activeVault}
        </span>
      )}
    </div>
  </div>
)}

                <p className="mt-3 text-center text-xs text-hoi-muted">
                  L’assistant peut utiliser uniquement les sources et outils
                  autorisés dans votre espace.
                </p>
              </div>
            </div>
          </main>

          <aside className="hidden w-80 border-l border-hoi-border bg-hoi-surface p-6 xl:block">
            <h2 className="font-semibold text-hoi-navy">
              Contexte actif
            </h2>

            <p className="mt-2 text-sm leading-6 text-hoi-muted">
              Sources utilisées pour cette conversation.
            </p>
{activeVault && (
  <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
      Périmètre sélectionné
    </p>

<select
  value={vaultId ?? ""}
  onChange={(event) => {
    router.push(`/chat?vaultId=${event.target.value}`);
  }}
  className="mt-2 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-900 outline-none focus:border-blue-500"
>
  {Object.entries(vaultNames).map(([id, name]) => (
    <option key={id} value={id}>
      {name}
    </option>
  ))}
</select>

    <p className="mt-1 text-xs leading-5 text-blue-800">
      L’Assistant utilisera les données autorisées de ce Vault.
    </p>
  </div>
)}
<Link
  href="/wiki"
  className="mt-3 inline-flex text-xs font-medium text-blue-700 hover:text-blue-900"
>
  Changer de Vault →
</Link>
            <div className="mt-6 space-y-3">
              <ContextItem
                title="My Context"
                description="Connaissances personnelles"
              />

              <ContextItem
                title="Company knowledge"
                description="Espace d’entreprise autorisé"
              />

              <ContextItem
                title="Activity Feed"
                description="Tâches et événements récents"
              />
            </div>

            <div className="mt-8 rounded-xl border border-hoi-border bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-hoi-muted">
                Permissions
              </p>

              <p className="mt-2 text-sm leading-6 text-hoi-navy">
                Lecture seule · Aucun envoi automatique
              </p>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

function ContextItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-hoi-border bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-hoi-cream p-2 text-hoi-navy">
          <BookOpen size={16} />
        </div>

        <div>
          <h3 className="text-sm font-medium text-hoi-navy">{title}</h3>
          <p className="mt-1 text-xs text-hoi-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}