import type { ReactNode } from "react";

type InfoCardProps = {
  /** Icon of the card, already sized by the caller. */
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  className?: string;
};

/**
 * Explanatory card: icon chip, title, paragraph. Carries prose rather than a
 * figure — use `MetricCard` when the card leads with a number.
 */
export default function InfoCard({
  icon,
  title,
  description,
  className = "",
}: InfoCardProps) {
  return (
    <div
      className={`rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm ${className}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hoi-cream text-hoi-navy">
        {icon}
      </div>

      <h2 className="mt-4 font-semibold text-hoi-navy">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-hoi-muted">{description}</p>
    </div>
  );
}
