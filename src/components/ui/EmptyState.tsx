import type { ReactNode } from "react";

type EmptyStateProps = {
  /** Localised message. Never pass raw business data as the only wording. */
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  /** Optional call to action, e.g. a button that clears the filters. */
  action?: ReactNode;
  className?: string;
};

export default function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`py-12 text-center ${className}`}>
      {icon && (
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-hoi-cream text-hoi-muted">
          {icon}
        </div>
      )}

      <p className="text-sm text-hoi-muted">{title}</p>

      {description && (
        <p className="mt-2 text-sm text-hoi-muted">{description}</p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
