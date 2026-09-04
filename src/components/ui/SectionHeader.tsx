import type { ReactNode } from "react";

type SectionHeaderProps = {
  /** Icon of the section, already sized by the caller. */
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  className?: string;
};

/**
 * Heading of a section inside a form or a panel: icon chip on the inline start,
 * title and one-line description next to it. For a page-level heading use
 * `PageHeader` instead.
 */
export default function SectionHeader({
  icon,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="rounded-lg bg-hoi-cream p-2.5 text-hoi-navy">{icon}</div>

      <div>
        <h2 className="font-semibold text-hoi-navy">{title}</h2>
        <p className="mt-1 text-sm text-hoi-muted">{description}</p>
      </div>
    </div>
  );
}
