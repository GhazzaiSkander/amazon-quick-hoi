import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className = "",
}: PageHeaderProps) {
  return (
    <header
      className={`mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between ${className}`}
    >
      <div>
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-hoi-accent">
            {eyebrow}
          </p>
        )}

        <h1 className="text-4xl font-semibold tracking-tight text-hoi-navy">
          {title}
        </h1>

        {description && (
          <p className="mt-3 max-w-2xl text-base leading-7 text-hoi-muted">
            {description}
          </p>
        )}
      </div>

      {actions && <div className="shrink-0">{actions}</div>}
    </header>
  );
}