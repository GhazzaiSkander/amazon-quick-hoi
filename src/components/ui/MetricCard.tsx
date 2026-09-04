import type { ReactNode } from "react";
import { toneClasses, type Tone } from "./StatusBadge";

type MetricCardProps = {
  icon: ReactNode;
  /** Already formatted for the active locale by the caller. */
  value: ReactNode;
  label: ReactNode;
  /** Tints the icon chip only; the card itself stays on paper. */
  tone?: Tone;
  className?: string;
};

export default function MetricCard({
  icon,
  value,
  label,
  tone = "neutral",
  className = "",
}: MetricCardProps) {
  return (
    <div
      className={`rounded-card border border-hoi-border bg-hoi-surface p-5 shadow-sm ${className}`}
    >
      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${toneClasses[tone]}`}
      >
        {icon}
      </div>

      <p className="text-2xl font-semibold text-hoi-navy">{value}</p>
      <p className="mt-1 text-sm text-hoi-muted">{label}</p>
    </div>
  );
}
