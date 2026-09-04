import type { ReactNode } from "react";

/**
 * Shared tone vocabulary for the status surfaces (badges, metric chips). The
 * classes stay on the House of Ichigo palette: calm tints, navy/muted text and
 * terracotta reserved for accents elsewhere.
 */
export type Tone = "neutral" | "success" | "warning" | "info" | "danger";

export const toneClasses: Record<Tone, string> = {
  neutral: "bg-hoi-cream text-hoi-navy",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  info: "bg-blue-50 text-blue-700",
  danger: "bg-red-50 text-red-700",
};

type StatusBadgeProps = {
  /** Localised label. Business identifiers stay verbatim, so pass them as-is. */
  children: ReactNode;
  tone?: Tone;
  /** Optional leading icon, already sized by the caller. */
  icon?: ReactNode;
  className?: string;
};

export default function StatusBadge({
  children,
  tone = "neutral",
  icon,
  className = "",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${toneClasses[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
