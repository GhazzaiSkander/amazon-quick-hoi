import type { ReactNode } from "react";

type LoadingStateProps = {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export default function LoadingState({
  title,
  description,
  className = "",
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-card border border-hoi-border bg-hoi-surface p-10 text-center shadow-sm ${className}`}
    >
      <div
        className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-hoi-border border-t-hoi-accent"
        aria-hidden
      />
      <p className="text-sm font-medium text-hoi-navy">{title}</p>
      {description && (
        <p className="mt-2 text-sm leading-6 text-hoi-muted">{description}</p>
      )}
    </div>
  );
}
