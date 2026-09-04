import type { ReactNode } from "react";

type FormFieldProps = {
  /** Localised label. Never pass raw business data. */
  label: ReactNode;
  /** The control itself: input, select, textarea… */
  children: ReactNode;
  className?: string;
};

/**
 * Label + control pair used by the creation and setup forms. The `<label>`
 * wraps the control, so clicking the caption focuses the field without needing
 * an id/htmlFor pair.
 */
export default function FormField({
  label,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-hoi-muted">
        {label}
      </span>

      {children}
    </label>
  );
}
